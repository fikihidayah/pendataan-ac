import { Category } from "./../models/Category.js";
import { validationResult, matchedData } from "express-validator";
import express from "express";
import query from "querystring";
import { Product } from "../models/Product.js";

class FilterController {
  /**
   * Halaman utama filter pencarian
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async index(req, res, next) {
    try {
      const slug = query.escape(req.query.category);
      const category = await Category.where("slug", slug).findOne();
      const products = await Product.find({ kategori: category._id });
      const categories = await Category.find();

      if (req.query.category) {
        return res.render("filter/index", {
          title: "Pencarian " + category.nama,
          products,
          categories,
          selectedCategory: category.nama,
        });
      }
      next(); // to not found
    } catch (error) {
      next(); // to not found
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
