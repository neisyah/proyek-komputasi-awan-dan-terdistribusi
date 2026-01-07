# StudentAccess Hub  
### Proyek Komputasi Awan dan Terdistribusi

## Deskripsi Proyek
StudentAccess Hub merupakan aplikasi web sederhana yang dibangun sebagai bagian dari tugas mata kuliah **Komputasi Awan dan Terdistribusi**.  
Proyek ini menerapkan konsep **arsitektur client-server** dan **komputasi terdistribusi** dengan memanfaatkan **Docker dan Docker Compose** untuk menjalankan beberapa service secara terpisah namun saling terintegrasi.

Aplikasi ini terdiri dari backend service, frontend interface, serta web server menggunakan Nginx.

---

## Tujuan Proyek
- Memahami konsep komputasi awan dan sistem terdistribusi  
- Mengimplementasikan aplikasi berbasis service  
- Menjalankan aplikasi menggunakan container (Docker)  
- Mengintegrasikan beberapa komponen dalam satu environment terdistribusi  

---

## Teknologi yang Digunakan
- **Node.js** (Backend)
- **HTML, CSS, JavaScript** (Frontend)
- **Nginx** (Web Server / Reverse Proxy)
- **Docker**
- **Docker Compose**

---

## Struktur Folder Proyek
## Struktur Folder Proyek
```text
proyek-komputasi-awan-dan-terdistribusi/
│
├── backend/                # Service backend
├── frontend/               # Tampilan frontend
├── nginx/                  # Konfigurasi Nginx
│
├── access-test.html        # Halaman testing akses
├── admin-login.html        # Halaman login admin
├── admin-dashboard.html   # Dashboard admin
│
├── app.js                  # Konfigurasi aplikasi
├── server.js               # Server backend
├── docker-compose.yml      # Orkestrasi container
├── README.md               # Dokumentasi proyek
```

---

## Arsitektur Sistem
Aplikasi dijalankan menggunakan beberapa container yang saling terhubung:
- **Frontend** sebagai antarmuka pengguna
- **Backend** sebagai pengelola logika aplikasi
- **Nginx** sebagai web server / reverse proxy

Semua service dijalankan secara terdistribusi menggunakan Docker Compose.

---

## Cara Menjalankan Proyek

### Prasyarat
Pastikan sudah terinstall:
- Docker
- Docker Compose

---

### Langkah Menjalankan
1. Clone repository:
```bash
git clone https://github.com/USERNAME/proyek-komputasi-awan-dan-terdistribusi.git

## Cara Menjalankan Proyek

### 1. Clone repository
```bash
git clone https://github.com/USERNAME/proyek-komputasi-awan-dan-terdistribusi.git
```

### 2. Masuk ke folder proyek
```bash
cd proyek-komputasi-awan-dan-terdistribusi
```

### 3. Jalankan Docker Compose
```bash
docker-compose up --build
```

### 4. Akses aplikasi melalui browser
```text
http://localhost
```


