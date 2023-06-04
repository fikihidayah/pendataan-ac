import { ExpressValidator } from "express-validator";
import fs from "fs/promises";
import { Product } from "../models/Product.js";

/**
 * Tempat untuk menyimpan custom validator
 */

const { body } = new ExpressValidator({
  uploaded: (value, { req }) => {
    if (!req.file) {
      throw new Error("File harus di upload");
    }

    return true;
  },
  formated: async (value, { req }) => {
    // validasi format data yang benar
    const image = req.file;

    if (!image) return true;

    const array_of_allowed_files = ["png", "jpeg", "jpg"];
    const array_of_allowed_file_types = ["image/png", "image/jpeg", "image/jpg"];

    // Get the extension of the uploaded file
    const file_extension = image.originalname.slice(((image.originalname.lastIndexOf(".") - 1) >>> 0) + 2);

    // Check if the uploaded file is allowed
    if (!array_of_allowed_files.includes(file_extension) || !array_of_allowed_file_types.includes(image.mimetype)) {
      await fs.unlink(image.path); // hapus file nya jika validasinya gk sesuai
      throw new Error("File yang diperbolehkan berekstensi png,jpg,dan jpeg");
    }

    return true;
  },
  fileSize: async (value, { req }) => {
    // Validasi gambar tidak boleh lebih dari beberapa MB
    const image = req.file;

    if (!image) return true;

    const allowed_file_size = req.fileSize ?? 2; // 2 mb
    if (image.size / (1024 * 1024) > allowed_file_size) {
      await fs.unlink(image.path);
      throw Error(`File maksimal ${allowed_file_size} MB`);
    }
  },
  uniqueKdProduk: async (value) => {
    const produk = await Product.findOne({ kd_produk: value });
    if (produk) {
      throw new Error("Kode produk sudah ada silahkan cari yang lain!");
    }

    return true;
  },
  uniqueUpdateKdProduk: async (value, { req }) => {
    const produk = await Product.where("_id").ne(req.body.id).where("kd_produk", value).findOne();
    if (produk) {
      throw new Error("Kode produk sudah ada silahkan cari yang lain!");
    }
    return true;
  },
});

export { body };
