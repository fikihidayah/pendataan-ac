# Aplikasi Sistem E-Commerce Penjualan AC

## Ringkasan
Aplikasi Penjualan AC berbasis E-Commerce memiliki fitur...

Teknologi pada aplikasi ini menggunakan :
1. **MongoDB** sebagai **Database**
2. **ExpressJS** sebagai **Backend**
3. **EJS** Template Engine sebagai **Front End**
4. **NodeJS** Sebagai **Runtime**

Node Module external yang di gunakan :
1. **connect-flash** membuat flash data express
2. **cookie-parser** membuat cookie pada session
3. **ejs** template engine
4. **express** framework backend nodeJS
5. **express-ejs-layouts** membuat layout pada ejs
6. **express-session** membuat session express
7. **express-validator** validasi dengan express
8. **method-override** mengoverride/menimpa method request saat submit form
9. **mongoose** ODM/ORM database mongoDB, mempermudah query mongoDB
10. **multer** mengupload file, middleware di jalankan di express agar memparsing form bertipa multipart/form data


## Skema Database
Rencana mau buat 1 tabel saja, tetapi saya ingin mengimplementasikan relasi yang ada di mysql ke mongoDB. Mysql menggunakan 2 tabel, Di mongoDB konsep relasi ada 2 yaitu metode embeded document, artinya bisa object di dalam object, kasus ini array of object karena ingin membuat gambar yang banyak atau relasi 1 to many. Serta membuat 1 tabel dengan metode reference atau relasi sebenarnya, ingat metode ini tidak terlalu di sarankan karena akan memperberat query karena saat memanggil setiap lopping data 1 produk akan akan query ke collection kategori.

### Berikut Skemanya
```javascript
// produk
{
    nama: String,
    kd_produk: string,
    n_kategori:string,
    deskripsi: LongString,
    gambar: Any
  }
{
  nama: 'Panasonic',
  kd_produk: 'acb_123',
  kategori: 'Reference atau relasi ke collection kategori',
  deskripsi: 'ac ini dingin',
  gambar: [
    {
      nama: 'gambar.jpg',
      path: 'to/1212.jpg'
    },
    {
      nama: 'gambar.jpg',
      path: 'to/1212.jpg'
    },
  ]
}

// Kategori
{ nama: String }
```