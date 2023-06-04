import categoryController from "../controllers/category.controller.js";
import { addEditCategory, deleteCategory } from "../configs/validation.js";
import express from "express";
import { isAuthenticate } from "../library/passport.js";

/**
 * Sengaja pakai docblock agar ada autocomplete nya 😁
 * @param {express.Express} app
 * @param {express.Router} route
 */

export default function category(app, route) {
  route.use(isAuthenticate);
  route.get("/", categoryController.index);

  route.get("/add", categoryController.create);

  route.post("/", addEditCategory, categoryController.insert);

  route.get("/edit/:id", categoryController.edit);

  route.put("/", addEditCategory, categoryController.update);

  route.delete("/", deleteCategory, categoryController.delete);

  app.use("/category", route);
}
