import { User } from "./../models/User.js";
import { validationResult, matchedData } from "express-validator";
import express from "express";
import { __dirname } from "./../configs/constants.js";
import _ from "lodash";

class AuthController {
  /**
   * Halaman utama kategori
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async login(req, res) {
    // const password = await bcrypt.hash("password", 10);
    res.render("auth/login", {
      title: "Login",
      navSet: "Login",
      // password,
    });
  }

  static loginProcess(req, res, next) {
    const validated = validationResult(req);

    if (!validated.isEmpty()) {
      req.flash("old", req.body);
      req.flash("error", validated.mapped());
      return res.redirect("/auth/login");
    }
    next();
  }

  /**
   * Halaman utama kategori
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", "Berhasil logout!");
      res.redirect("/auth/login");
    });
  }
}
export default AuthController;
