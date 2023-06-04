import { Brand } from "./../models/Brand.js";
import { validationResult, matchedData } from "express-validator";
import express from "express";
import fs from "fs";
import { __dirname } from "./../configs/constants.js";
import _ from "lodash";

class BrandController {
  /**
   * Halaman utama kategori
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async index(req, res) {
    const data = await Brand.find();

    res.render("brand/index", {
      title: "Brand",
      navSet: "Brand",
      data,
    });
  }

  /**
   * Halaman tambah kategori
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static create(req, res) {
    res.render("brand/add", {
      title: "Tambah Brand",
      navSet: "Brand",
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
      // hapus file yang validasi error nya
      if (req.file) {
        fs.unlink(req.file.path, (err) => {});
      }
      req.flash("error", errors.mapped());
      res.redirect("/brand/add");
    } else {
      const toInsert = matchedData(req); // sanitize data
      toInsert.logo = "uploads/logo/" + req.file.filename;
      Brand.create(toInsert);
      req.flash("success", "Sukses berhasil menambahkan brand");
      res.redirect("/brand");
    }
  }

  /**
   * Halaman ubah brand
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async edit(req, res, next) {
    try {
      const data = await Brand.findById(req.params.id);
      res.render("brand/edit", {
        title: "Ubah data Brand",
        navSet: "Brand",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Aksi ubah brand
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async update(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("old", req.body);
      if (req.file) {
        fs.unlink(req.file.path, (err) => {});
      }
      req.flash("error", errors.mapped());
      res.redirect(`/brand/edit/${req.body._id}`);
    } else {
      const toUpdate = matchedData(req); // sanitize data
      const brand = await Brand.findById(req.body._id);
      if (brand.logo) {
        fs.unlink(__dirname + "/public/" + brand.logo, (err) => {});
      }

      if (req.file) {
        toUpdate.logo = "uploads/logo/" + req.file.filename;
      }

      try {
        await Brand.updateOne({ _id: req.body._id }, toUpdate);
        req.flash("success", "Sukses berhasil mengubah brand");
        res.redirect("/brand");
      } catch (e) {
        next(e);
      }
    }
  }

  /**
   * Aksi hapus brand
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async delete(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", "Data tidak berhasil di hapus!");
      res.redirect("/brand");
    } else {
      try {
        const brand = await Brand.findById(req.body._id);
        if (brand.logo) {
          console.log("file di hapus");
          fs.unlink(__dirname + "/public/" + brand.logo, (err) => {
            console.log(err);
          });
        }
        await Brand.deleteOne({ _id: req.body._id });
        req.flash("success", "Sukses berhasil menghapus brand");
        res.redirect("/brand");
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  }
}

export default BrandController;
