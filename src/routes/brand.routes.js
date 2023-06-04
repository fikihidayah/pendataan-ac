import brandController from "../controllers/brand.controller.js";
import { addBrand, deleteBrand, editBrand } from "../configs/validation.js";
import express from "express";
import multer from "multer";
import { brandDisk } from "../library/multer.js";
import { isAuthenticate } from "../library/passport.js";

/**
 * Sengaja pakai docblock agar ada autocomplete nya 😁
 * @param {express.Express} app
 * @param {express.Router} route
 */

export default function brand(app, route) {
  route.use(isAuthenticate);

  // configurasi size pada file upload
  app.use((req, res, next) => {
    req.fileSize = 1; // 1MB
    next();
  });

  route.get("/", brandController.index);

  route.get("/add", brandController.create);

  const logoUpload = multer({
    storage: brandDisk,
  });

  route.post("/", logoUpload.single("logo"), addBrand, brandController.insert);

  route.get("/edit/:id", brandController.edit);

  route.post("/update", logoUpload.single("logo"), editBrand, brandController.update);

  route.delete("/", deleteBrand, brandController.delete);

  app.use("/brand", route);
}
