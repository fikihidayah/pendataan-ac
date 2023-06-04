import { body } from "./../library/express-validator.js";

const addEditCategory = [body("nama", "Nama tidak boleh kosong").notEmpty().isLength({ max: 100 }).withMessage("Maksimal 100 karakter"), body("slug", "Slug tidak boleh kosong").notEmpty().isSlug().withMessage("Harus berformat slug")];
const deleteCategory = body("_id").notEmpty();
const addProduct = [
  body("nama", "Nama harus diisi").notEmpty(),
  body("slug", "Slug tidak boleh kosong").notEmpty().isSlug().withMessage("Harus berformat slug").isLength({ max: 300 }).withMessage("Maksimal 300 karakter"),
  body("kd_produk", "Kode Produk harus diisi").notEmpty().uniqueKdProduk(),
  body("deskripsi", "Panjang deskripsi minimal 20 karakter").isLength({ min: 20, max: 2000 }),
  body("kategori", "Kategori harus diisi").notEmpty(),
  body("brand", "Brand harus diisi").notEmpty(),
  body("harga", "Harga harus diisi").notEmpty().isInt().withMessage("Harus angka"),
  body("diskon", "Diskon harus diisi").notEmpty().isFloat({ min: 0, max: 99 }).withMessage("Angka diskon minimal 0 maksimal 99"),
  body("stock", "Stock harus diisi").notEmpty().isInt({ min: 0 }).withMessage("Harus angka, minimal 0"),
  body("gambar").uploaded().formated().fileSize(),
];
const editProduct = [
  body("nama", "Nama harus diisi").notEmpty(),
  body("slug", "Slug tidak boleh kosong").notEmpty().isSlug().withMessage("Harus berformat slug").isLength({ max: 300 }).withMessage("Maksimal 300 karakter"),
  body("kd_produk", "Kode Produk harus diisi").notEmpty().uniqueUpdateKdProduk(),
  body("deskripsi", "Panjang deskripsi minimal 20 karakter").isLength({ min: 20, max: 2000 }),
  body("kategori", "Kategori harus diisi").notEmpty(),
  body("brand", "Brand harus diisi").notEmpty(),
  body("harga", "Harga harus diisi").notEmpty().isInt().withMessage("Harus angka"),
  body("diskon", "Diskon harus diisi").notEmpty().isFloat({ min: 0, max: 99 }).withMessage("Angka diskon minimal 0 maksimal 99"),
  body("stock", "Stock harus diisi").notEmpty().isInt({ min: 0 }).withMessage("Harus angka, minimal 0"),
  body("gambar").formated().fileSize(),
];

const editProductGambar = [body("gambar").uploaded().formated().fileSize(), body("id", "Id tidak boleh kosong").notEmpty()];

const addBrand = [
  body("nama", "Nama brand tidak boleh kosong").notEmpty().isLength({ max: 100 }).withMessage("Maksimal 100 karakter"),
  body("slug", "Slug tidak boleh kosong").notEmpty().isSlug().withMessage("Harus berformat slug").isLength({ max: 300 }).withMessage("Maksimal 300 karakter"),
  body("logo").uploaded().formated().fileSize(),
];

const editBrand = [
  body("nama", "Nama brand tidak boleh kosong").notEmpty().isLength({ max: 100 }).withMessage("Maksimal 100 karakter"),
  body("slug", "Slug tidak boleh kosong").notEmpty().isSlug().withMessage("Harus berformat slug").isLength({ max: 300 }).withMessage("Maksimal 300 karakter"),
  body("logo").formated().fileSize(),
];

const login = [body("email", "Email harus diisi").notEmpty().trim(), body("password", "Password harus diisi").notEmpty()];

const deleteBrand = body("_id").notEmpty();

export { addProduct, addEditCategory, deleteCategory, editProduct, editProductGambar, addBrand, editBrand, deleteBrand, login };
