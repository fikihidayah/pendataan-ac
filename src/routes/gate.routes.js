import express from "express";
import passport from "passport";
import { login } from "./../configs/validation.js";
import AuthController from "./../controllers/auth.controller.js";
import { isNotAuthenticate } from "./../library/passport.js";

/**
 * Route untuk menghandle fungsi login
 * @param {express.Express} app
 * @param {express.Router} route
 */
export default function gate(app, route) {
  route.use(isNotAuthenticate);
  route.get("/login", AuthController.login);
  route.post(
    "/login",
    login,
    AuthController.loginProcess,
    passport.authenticate("local", {
      failureRedirect: "/auth/login",
      failureFlash: true,
    }),
    (req, res) => {
      req.flash("success", "Berhasil login");
      res.redirect("/dashboard");
    }
  );

  app.post("/logout", AuthController.logout);

  app.use("/auth", route);
}
