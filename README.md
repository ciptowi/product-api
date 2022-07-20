## Required applications are installed :
* Node Js https://nodejs.org/en/download/
* PostgreSQL https://www.postgresql.org/download/

### Bagaimana cara menjalankan App ini?

* Clone repository ini :
  ```bash
    git clone https://github.com/ciptowi/product-api.git
  ```
* Sesuaikan konfigurasi database dengan local anda, ubah file `database.json` pada directory `src/config/database.json`. Ganti username & password yang sesuai
  <div><img src="./docs/screenshot/config-db.png" widht="500" height="500"/></div>
*  Install dependencies yang dibutuhkan dengan menjalankan perintah :
   ```bash
    npm install
    ```
* Buat database baru sesuai konfigurasi pada `database.json`, jalankan perintah :
  ```bash
  sequelize db:create
  ```
* Migrasi database sesuai dengan model yang telah dibuat, jalankan perintah :
  ```bash
  sequelize db:migrate
  ```
* Running server dengan menjalankan perintah :
  ```bash
  npm run dev
  ```
  
  ### Testing API
  * Registrasi Awal `http://localhost:5000/auth/signup` dengan method `POST`
    <div><img src="./docs/screenshot/signup.png" widht="500" height="500"/></div>
  * Login `http://localhost:5000/auth/login` dengan method `POST`
    <div><img src="./docs/screenshot/login.png" widht="500" height="500"/></div>
  * Setting Header `Authorisazion` isi value dengan `acces_token` login
    <div><img src="./docs/screenshot/auth-key.png" widht="500" height="500"/></div>
    
  #### Dokumentasi API https://testbinar.docs.apiary.io/
