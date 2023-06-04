import { Category } from "./../models/Category.js";
import { Product } from "./../models/Product.js";
import { validationResult, matchedData } from "express-validator";
import fs from "fs/promises";
import { __dirname } from "../configs/constants.js";
import express from "express";
import { Brand } from "../models/Brand.js";

class ProductController {
  /**
   * Halaman utama produk
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async index(req, res) {
    let data = await Product.find().populate("kategori", "nama");

    res.render("product/index", {
      title: "Data Produk",
      data,
      // success: req.flash("success"),
      // error: req.flash("error"), // sudah di setting sebagai global variable pada view di middleware halaman bootstrap.js
      navSet: "Produk",
    });
  }

  /**
   * Halaman tambah produk
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async add(req, res) {
    res.render("product/add", {
      title: "Tambah data produk",
      categories: await Category.find(),
      brands: await Brand.find(),
      navSet: "Produk",
    });
  }

  /**
   * Aksi tambah produk
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async create(req, res) {
    const errors = validationResult(req);
    req.flash("old", req.body);

    if (!errors.isEmpty()) {
      // check apakah file terlanjur di upload atau tidak, karena jika file tidak terupload akan throw error
      try {
        await fs.unlink(req.file.path); // jika terlanjur maka hapus file nya
      } catch (e) {}

      req.flash("error", errors.mapped());
      res.status(403).redirect("/product/add");
    } else {
      const rightInput = matchedData(req);
      const createdProduct = await Product.create({
        nama: rightInput.nama,
        slug: rightInput.slug,
        kd_produk: rightInput.kd_produk,
        kategori: rightInput.kategori,
        brand: rightInput.brand,
        harga: rightInput.harga,
        diskon: rightInput.diskon,
        stock: rightInput.stock,
        deskripsi: rightInput.deskripsi,
        gambar: [
          {
            nama: req.file.filename,
            path: "uploads/images/" + req.file.filename,
          },
        ],
      });

      if (createdProduct) {
        req.flash("success", "Sukses berhasil menambah produk");
        res.redirect("/product");
      }
    }
  }

  /**
   * Halaman ubah produk
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async edit(req, res, next) {
    try {
      res.render("product/edit", {
        title: "Ubah data produk",
        categories: await Category.find(),
        brands: await Brand.find(),
        navSet: "Produk",
        product: await Product.findById(req.params.id),
      });
    } catch (e) {
      next();
    }
  }

  /**
   * Aksi ubah produk
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async update(req, res) {
    const errors = validationResult(req);
    req.flash("old", req.body);

    if (!errors.isEmpty()) {
      req.flash("error", errors.mapped());
      return res.redirect("/product/edit/" + req.body.id);
    }

    const rightInput = matchedData(req);
    const toUpdate = {
      nama: rightInput.nama,
      slug: rightInput.slug,
      kd_produk: rightInput.kd_produk,
      kategori: rightInput.kategori,
      brand: rightInput.brand,
      harga: rightInput.harga,
      diskon: rightInput.diskon,
      stock: rightInput.stock,
      deskripsi: rightInput.deskripsi,
    };

    if (req.file) {
      // Jika ada file maka push/tambah datanya
      // update subdocument
      toUpdate.$push = {
        gambar: {
          nama: req.file.filename,
          path: "uploads/images/" + req.file.filename,
        },
      };
    }

    const updatedProduct = await Product.updateOne({ _id: req.body.id }, toUpdate);

    if (updatedProduct) {
      req.flash("success", "Sukses berhasil mengubah produk");
      res.redirect("/product/edit/" + req.body.id);
    }
  }

  /**
   * Halaman gambar produk
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async getGambar(req, res, next) {
    try {
      const { gambar } = await Product.findOne({ "gambar._id": req.body.id });
      res.json(gambar.id(req.body.id));
    } catch (e) {
      next(); // set not found
    }
  }

  /**
   * Aksi ubah gambar produk
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async editGambar(req, res, next) {
    // action
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(403).json(errors.mapped());
      return;
    }

    if (req.file) {
      try {
        const data = matchedData(req);

        // data yang di find ini adalah data lama, lalu di update ke data yang baru
        // update subdocument
        const { gambar } = await Product.findOneAndUpdate(
          { "gambar._id": data.id },
          {
            "gambar.$.nama": req.file.filename,
            "gambar.$.path": "uploads/images/" + req.file.filename,
          }
        );

        // jadi data yang dikembalikan tetap data lama
        const oldGambar = gambar.id(data.id);

        // hapus gambar lama
        if (oldGambar) {
          await fs.unlink(__dirname + "/public/" + oldGambar.path);
        }

        res.json({ status: "ok" });
        return;
      } catch (error) {
        next(error);
      }
    }
  }

  /**
   * Aksi hapus gambar produk
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async deleteGambar(req, res, next) {
    const id = req.body._id;
    try {
      const product = await Product.findOne({ "gambar._id": id });

      // jika gambarnya lebih dari 1/ ketika di hapus menyisakan minimal 1 gambar
      if (product.gambar.length > 1) {
        // hapus gambar
        const gambarPath = product.gambar.id(id);
        try {
          await fs.unlink(__dirname + "/public/" + gambarPath.path);
        } catch (error) {}
        gambarPath.deleteOne(); // hapus subdocument
        await product.save();

        req.flash("success", "Gambar berhasil di hapus");
        res.redirect("/product/edit/" + product._id);
        return;
      }

      req.flash("error", "Gambar tidak bisa dihapus, karena tersisa 1 saja");
      res.redirect("/product/edit/" + product._id);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Aksi hapus produk
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async delete(req, res, next) {
    try {
      const product = await Product.findById(req.body._id);

      // hapus beberapa gambar
      product.gambar.map(async (gambar, key) => {
        try {
          await fs.unlink(__dirname + "/public/" + gambar.path);
        } catch (error) {}
      });

      await Product.deleteOne({ _id: req.body._id });

      req.flash("success", "Gambar berhasil di hapus");
      res.redirect("/product");
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
