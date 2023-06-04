import Home from "./../controllers/home.controller.js";
import express from "express";
import { isAuthenticate } from "../library/passport.js";

/**
 * Sengaja pakai docblock agar ada autocomplete nya 😁
 * @param {express.Express} app
 */
export default function home(app) {
  app.get("/", Home.index);
  app.get("/dashboard", isAuthenticate, Home.dashboard);
}
