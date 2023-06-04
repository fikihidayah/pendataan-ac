import express from "express";
import FilterController from "./../controllers/filter.controller.js";

/**
 * @param {express.Express} app
 * @param {express.Router} router
 */
export default function filter(app, router) {
  router.get("", FilterController.index);

  app.use("/filter", router);

  app.get("/q/:slug", FilterController.query);
}
