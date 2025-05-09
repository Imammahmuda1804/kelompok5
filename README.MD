# Web Baca Buku Kelompok 5

Ini adalah aplikasi web untuk pencarian dan pengelolaan buku. Aplikasi ini memungkinkan pengguna untuk mencari buku berdasarkan judul atau penulis, menambah, memperbarui, dan menghapus buku dari database. Data buku disimpan di MySQL dan didukung oleh Elasticsearch untuk pencarian yang lebih cepat.

## Anggota kelompok
- Imam mahmuda - 2211083028
- Winaldo Ageng Kalimasada - 2111082047
- Nurhadi Sa'bani - 2211081021
- Razi Syahriful Zanah - 2211081025

## Fitur Utama

- **Pencarian Buku**: Mencari buku berdasarkan judul atau penulis menggunakan Elasticsearch.
- **Tambah Buku**: Menambahkan buku baru ke dalam database.
- **Edit Buku**: Memperbarui informasi buku.
- **Hapus Buku**: Menghapus buku dari database.
- **Tampilan Responsif**: Antarmuka yang responsif dan user-friendly untuk pengelolaan buku.

## Teknologi yang Digunakan

- **Backend**: Node.js
- **Database**: MySQL
- **Pencarian**: Elasticsearch
- **Frontend**: HTML, CSS, JavaScript
- **API**: REST API untuk komunikasi antara frontend dan backend.

## Instalasi

### Prasyarat

Sebelum menjalankan aplikasi ini, pastikan Anda memiliki perangkat lunak berikut terinstal:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Elasticsearch](https://www.elastic.co/elasticsearch/)

### Langkah-langkah Instalasi

1. **Clone Repository**

   Pertama, clone repository ini ke lokal Anda:

   ```bash
   git clone https://github.com/Imammahmuda1804/kelompok5.git
   cd kelompok5
   ```

2. **Instalasi Dependensi**
    ```bash
    npm install
   ```
3. **Konfigurasi MySQL**
    Buat database di MySQL dengan nama books_db.
    ```bash
    CREATE TABLE books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        description TEXT,
        year INT,
        content TEXT
    );

   ```
4. **Jalankan Elasticsearch**
    Pastikan Anda sudah menjalankan Elasticsearch di http://localhost:9200.

5. **Instalasi Dependensi**
    ```bash
    npm start
   ```
### Testing API

1. **Menambahkan buku baru**
    ```bash
    curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d '{
        "title": "JavaScript: The Definitive Guide",
        "author": "David Flanagan",
        "description": "A complete reference for JavaScript.",
        "year": 2021,
        "content": "Chapter 1: JavaScript Basics..."
     }'

   ```
2. **Mencari buku**
    ```bash
    curl "http://localhost:3000/api/books/search?q=JavaScript"
   ```
3. **Memperbarui buku**
    ```bash
    curl -X PUT http://localhost:3000/api/books/1 -H "Content-Type: application/json" -d '{
     "title": "JavaScript: The Definitive Guide (Updated)",
     "author": "David Flanagan",
     "description": "An updated reference for JavaScript.",
     "year": 2022,
     "content": "Chapter 1: Advanced JavaScript..."
     }'
   ```
4. **Menghapus buku**
    ```bash
    curl -X DELETE http://localhost:3000/api/books/1
   ```
