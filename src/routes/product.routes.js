import { productDisk, multer } from "../library/multer.js";
import ProductController from "../controllers/product.controller.js";
import { addProduct, editProduct, editProductGambar } from "../configs/validation.js";
import express from "express";
import { isAuthenticate } from "../library/passport.js";

/**
 * Sengaja pakai docblock agar ada autocomplete nya 😁
 * @param {express.Express} app
 * @param {express.Router} router
 */
export default function product(app, router) {
  router.use(isAuthenticate);
  router.get("/", ProductController.index);

  router.get("/add", ProductController.add);

  const gambarUpload = multer({
    storage: productDisk,
  });

  // agar storage nya digunakan saat upload file via middleware
  // Goalsnya adalah validasi dulu baru upload file
  router.post("/", gambarUpload.single("gambar"), ProductController.setWa, addProduct, ProductController.create);

  router.get("/edit/:id", ProductController.edit);

  // multer tidak support menggunakan method PUT, karena di jalankan sebagai multipart, jika di override maka akan tetap menggunakan POST
  router.post("/update", gambarUpload.single("gambar"), ProductController.setWa, editProduct, ProductController.update);

  router.post("/gambar", ProductController.getGambar);

  router.post("/gambar/update", gambarUpload.single("gambar"), editProductGambar, ProductController.editGambar);

  router.delete("/gambar", ProductController.deleteGambar);

  router.delete("/", ProductController.delete);

  app.use("/product", router);
}
