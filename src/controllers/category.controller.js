import { Category } from "./../models/Category.js";
import { validationResult, matchedData } from "express-validator";
import express from "express";

class CategoryController {
  /**
   * Halaman utama kategori
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async index(req, res) {
    const data = await Category.find();

    res.render("category/index", {
      title: "Kategori Produk",
      navSet: "Kategori",
      data,
    });
  }

  /**
   * Halaman tambah kategori
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static create(req, res) {
    res.render("category/add", {
      title: "Tambah Kategori Produk",
      navSet: "Kategori",
    });
  }

  /**
   * Aksi tambah kategori
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static insert(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("old", req.body);
      req.flash("error", errors.mapped());
      res.redirect("/category/add");
    } else {
      const toInsert = matchedData(req); // sanitize data
      Category.create(toInsert);
      req.flash("success", "Sukses berhasil menambahkan kategori");
      res.redirect("/category");
    }
  }

  /**
   * Halaman ubah kategori
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async edit(req, res, next) {
    try {
      const data = await Category.findById(req.params.id);
      res.render("category/edit", {
        title: "Ubah Kategori Produk",
        navSet: "Kategori",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Aksi ubah kategori
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async update(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", errors.mapped());
      res.redirect(`/category/edit/${req.body._id}`);
    } else {
      const toInsert = matchedData(req); // sanitize data
      try {
        await Category.updateOne({ _id: req.body._id }, toInsert);
        req.flash("success", "Sukses berhasil mengubah kategori");
        res.redirect("/category");
      } catch (e) {
        next(e);
      }
    }
  }

  /**
   * Aksi hapus kategori
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async delete(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", "Data tidak berhasil di hapus!");
      res.redirect("/category");
    } else {
      try {
        await Category.deleteOne({ _id: req.body._id });
        req.flash("success", "Sukses berhasil menghapus kategori");
        res.redirect("/category");
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  }
}

export default CategoryController;
