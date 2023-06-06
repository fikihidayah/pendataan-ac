import express from "express";
import { Category } from "./../models/Category.js";
import { Brand } from "./../models/Brand.js";

export default class Home {
  /**
   * Halaman utama
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async index(req, res) {
    res.render("index", {
      title: "Beranda",
      navSet: "Beranda",
      categories: await Category.find(),
      brands: await Brand.find(),
      // layout: "layouts/main", // gak perlu di set lagi karena sudah di set default
    });
  }

  /**
   * Halaman dashboard
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static dashboard(req, res) {
    res.render("dashboard", {
      title: "Dashboard",
      navSet: "Dashboard",
      user: req.user,
    });
  }
}
