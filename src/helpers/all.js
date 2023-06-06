import express from "express";
import _ from "lodash";

/**
 * Helper yang dapat di gunakan pada view ejs, bahkan di mana saja
 * @param {express.Express} app
 */
export default function all(app) {
  app.locals.copyright = function () {
    return new Date().getFullYear();
  };
  app.locals.navSet = ""; // fallback navSet/navbar yang seharusnya active jika tidak di set pada render ejs
  app.locals.hitungHargaSetelahDiskon = (harga, diskon) => {
    let total = 0;
    const totalDiskon = Number(harga) * (diskon / 100);
    total = Number(harga) - totalDiskon;

    return app.locals.setRupiah(total);
  };
  app.locals.setRupiah = (nilai) => {
    let result = Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 3,
    }).format(nilai);

    if (result == "RpNaN") {
      result = "Rp " + 0;
    }
    return result;
  };
  app.locals._ = _;

  // Setting flash message dan yang membutuhkan request dan response
  app.use((req, res, next) => {
    res.locals.error = req.flash("error")[0];
    res.locals.success = req.flash("success")[0];
    res.locals.old = req.flash("old")[0];
    res.locals.isLogin = req.isAuthenticated();
    res.locals.fullUrl = () => {
      const protocol = req.protocol;
      const host = req.hostname;
      const url = req.originalUrl;
      const port = process.env.PORT;

      const fullUrl = `${protocol}://${host}:${port}${url}`;
      return fullUrl;
    };
    next();
  });
}
