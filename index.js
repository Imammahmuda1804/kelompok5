// Dependencies: express, mysql2, @elastic/elasticsearch, body-parser, cors

const express = require('express');
const mysql = require('mysql2/promise');
const { Client } = require('@elastic/elasticsearch');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL setup
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'books_db'
});

// Elasticsearch setup
const esClient = new Client({
    node: 'http://localhost:9200',
    ssl: {
      rejectUnauthorized: false, // Mengabaikan sertifikat self-signed
    }
  });  

// Sync book to Elasticsearch
async function syncToElasticsearch(book) {
  await esClient.index({
    index: 'books',
    id: book.id.toString(),
    body: {
      title: book.title,
      author: book.author,
    }
  });
}

// Routes
app.get('/api/books/search', async (req, res) => {
  const { q } = req.query;
  const result = await esClient.search({
    index: 'books',
    query: {
      multi_match: {
        query: q,
        fields: ['title', 'author']
      }
    }
  });
  const hits = result.hits.hits.map(hit => ({ id: hit._id, ...hit._source }));
  res.json(hits);
});

app.get('/api/books/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).send('Not found');
  res.json(rows[0]);
});

app.post('/api/books', async (req, res) => {
  const { title, author, description, year, content } = req.body;
  const [result] = await db.query(
    'INSERT INTO books (title, author, description, year, content) VALUES (?, ?, ?, ?, ?)',
    [title, author, description, year, content]
  );
  const book = { id: result.insertId, title, author };
  await syncToElasticsearch(book);
  res.status(201).json({ id: result.insertId });
});

app.put('/api/books/:id', async (req, res) => {
  const { title, author, description, year, content } = req.body;
  await db.query(
    'UPDATE books SET title = ?, author = ?, description = ?, year = ?, content = ? WHERE id = ?',
    [title, author, description, year, content, req.params.id]
  );
  await syncToElasticsearch({ id: req.params.id, title, author });
  res.sendStatus(200);
});

app.delete('/api/books/:id', async (req, res) => {
  await db.query('DELETE FROM books WHERE id = ?', [req.params.id]);
  await esClient.delete({ index: 'books', id: req.params.id });
  res.sendStatus(204);
});

// Menyajikan file statis (CSS, JS, dll)
app.use(express.static(path.join(__dirname, '')));

// Menyajikan index.html saat root URL diakses
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Menyajikan Insert.html saat /insert diakses
app.get('/insert', (req, res) => {
  res.sendFile(path.join(__dirname, 'Insert.html'));
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
