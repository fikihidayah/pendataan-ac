import { Category } from "./../models/Category.js";
import { validationResult, matchedData } from "express-validator";
import express from "express";
import query from "querystring";
import { Product } from "../models/Product.js";
import { Brand } from "../models/Brand.js";

class FilterController {
  /**
   * Halaman utama filter pencarian
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async index(req, res, next) {
    try {
      const slug = query.escape(req.query.category ?? req.query.brand);
      const type = req.query.category ? "category" : "brand";
      const category = await Category.where("slug", slug).findOne();
      const brand = await Brand.where("slug", slug).findOne();
      let products = {};
      try {
        products = await Product.find({ kategori: category._id });
      } catch (e) {
        products = await Product.find({ brand: brand._id });
      }

      const brands = await Brand.find();
      const categories = await Category.find();
      const title = category?.nama ?? brand?.nama;

      if (req.query.category || req.query.brand) {
        return res.render("filter/index", {
          title: "Pencarian " + title,
          products,
          categories,
          brands,
          selectedCategory: category?.nama,
          selectedBrand: brand?.nama,
          type,
        });
      }
      next(); // to not found
    } catch (error) {
      next(error); // to not found
    }
  }

  /**
   * Halaman utama filter pencarian
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async query(req, res, next) {
    try {
      const product = await Product.where("slug", req.params.slug).findOne().populate(["brand", "kategori"]);
      const otherProduct = await Product.where("slug").ne(req.params.slug).find();
      res.render("filter/product", {
        title: "Jual " + product.name,
        product,
        otherProduct,
      });
    } catch (error) {
      next();
    }
  }
}

export default FilterController;
