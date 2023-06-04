import category from "./../routes/category.routes.js";
import home from "./../routes/home.routes.js";
import product from "./../routes/product.routes.js";
import filter from "./../routes/filter.routes.js";
import express, { Router } from "express";
import brand from "../routes/brand.routes.js";
import gate from "../routes/gate.routes.js";

/**
 * Tempat memanggil semua route
 * @param {express.Express} app
 */
const routes = (app) => {
  home(app);
  gate(app, Router());
  category(app, Router());
  product(app, Router());
  filter(app, Router());
  brand(app, Router());
};

export default routes;
