# Aplikasi Sistem E-Commerce Penjualan AC

## Ringkasan
Aplikasi Penjualan AC berbasis E-Commerce yang sangat sederhana.
Fitur nya:
1. Login dan Logout Admin, autentikasi dan autorisasi dengan passport.js, strategy yang digunakan adalah local strategy dengan penyimanan session nya dengan mongoDB
2. CRUD Menu Produk, ada fitur ajax saat upload file, memiliki relasi dengan ke2 tabel, tipe relasi nya berbeda yaitu dengan embeded document(gambar) dan reference document(kategori dan brand)
3. CRUD Menu Kategori
4. CRUD Menu Brand
5. Menu utama, yang bisa di akses user manapun, Bisa filter ac berdasarkan brand dan Kategori AC Split, selanjutnya user bisa memesan ac dengan nomor wa yang sudah di link kan

Teknologi pada aplikasi ini menggunakan :
1. **MongoDB** sebagai **Database**
2. **ExpressJS** sebagai **Backend**
3. **EJS** Template Engine sebagai **Front End**
4. **NodeJS** Sebagai **Runtime**

Node Module external yang di gunakan :
1. **express-flash** membuat flash data express
2. **cookie-parser** membuat cookie pada session
3. **ejs** template engine
4. **express** framework backend nodeJS
5. **express-ejs-layouts** membuat layout pada ejs
6. **express-session** membuat session express
7. **express-validator** validasi dengan express
8. **method-override** mengoverride/menimpa method request saat submit form
9. **mongoose** ODM/ORM database mongoDB, mempermudah query mongoDB
10. **multer** mengupload file, middleware di jalankan di express agar memparsing form bertipa multipart/form data
11. **lodash** manipulasi tipe data apapun dengan mudah
12. **dotenv** membuat kredential dengan .env file
13. **passport** mempermudah saat proses pembuatan fitur autentikasi dan autorisasi
14. **passport-local** stategi menyimpan informasi login dengan local server
15. **slug** mempermudah pembuatan slug
16. **express-useragent** mempermudah mendapatkan informasi client
17. **connect-mongo** menyimpan informasi session di mongodb, agar ketika server di restart session nya gk hilang, default session di simpan di memory
18. **bcrypt** mengenkripsi tulisan password


## Skema Database
Rencana mau buat 1 tabel saja, tetapi saya ingin mengimplementasikan relasi yang ada di mysql ke mongoDB. Mysql menggunakan 2 tabel, Di mongoDB konsep relasi ada 2 yaitu metode embeded document, artinya bisa object di dalam object, kasus ini array of object karena ingin membuat gambar yang banyak atau relasi 1 to many. Serta membuat 1 tabel dengan metode reference atau relasi sebenarnya, ingat metode ini tidak terlalu di sarankan karena akan memperberat query karena saat memanggil setiap lopping data 1 produk akan akan query ke collection kategori.

### Berikut Skemanya
```javascript
// Product.js
// productSchema
{
  nama: {
    type: String,
    index: true,
    maxLength: 100,
  },
  slug: {
    type: String,
    maxLength: 300,
  },
  kd_produk: {
    type: String,
    unique: true, // set unique
  },
    kategori: {
    type: ObjectId,
    ref: "Category",
  },
    deskripsi: String,
  gambar: [gambarSchema],
  brand: {
    type: ObjectId,
    ref: "Brand",
  },
    harga: Number,
  diskon: {
    type: Number,
    max: 100,
    min: 0,
  },
    stock: Number,
  whatsapp: {
    type: Number,
    maxLength: 20,
  },
}

// gambarSchema
{
  nama: {
    type: String,
    maxLength: 100,
  },
  path: String,
}

// Category.js
// categorySchema
{
  nama: String,
  slug: String,
}

// Brand.js
// brandSchema
{
  nama: {
    type: String,
    maxLength: 100,
    trim: true,
  },
  logo: String,
  slug: {
    type: String,
    maxLength: 300,
  },
}
```

## Kredential Login
```
email: admin@admin.com
password: password
```