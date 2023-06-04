import express from "express";
import layouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "express-flash";
import methodOverride from "method-override";
import routes from "./configs/routes.js";

import all from "./helpers/all.js";
import { __dirname } from "./configs/constants.js";
import ErrorController from "./controllers/error.controller.js";
import useragent from "express-useragent";
import passport from "passport";
import initPassport from "./library/passport.js";

/**
 * Menjalankan semua fungsi dasar
 * @return {express.Express} app
 */
function run() {
  const app = express();

  // inisialisasi passport.js
  initPassport(passport);
  app.set("views", __dirname + "/src/views"); // set views folder
  app.set("view engine", "ejs");
  app.use(layouts);
  app.set("layout extractScripts", true);
  app.set("layout extractStyles", true);
  app.set("layout", "layouts/main"); // default layouts
  app.use(express.static(__dirname + "/public")); // expose static file seperti file css
  app.use(express.urlencoded({ extended: false })); // mendapatkan post data, dan express sekarang sudah menggunakan module bodyParser sebagai penerjemah request method selain get
  app.use(express.json());
  app.use(
    methodOverride((req, res, next) => {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        // custom override method yang awalnya query string jadi post body dengan '_method'
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );
  app.use(useragent.express());

  app.use(cookieParser("gasmajuterus"));
  app.use(
    session({
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 hari
      },
      name: "X-AC-SESSION",
      secret: "gasmajuterus",
      resave: true,
      saveUninitialized: false,
    })
  );
  app.use(flash());

  app.use(passport.initialize());
  // tambahkan passport session agar dapat mengelola login
  app.use(passport.session());

  // Load helper
  all(app);
  // Akhir helper

  // route dipanggil disini
  routes(app);
  // akhir router

  // tangkap semua error yang gk tertangkap oleh express, jadi aplikasi gk berhenti
  process.on("uncaughtException", (err) => {
    console.error(err);
  });

  // error handling
  app.use(ErrorController.log);
  app.use(ErrorController.response);
  app.use(ErrorController.notfound);

  return app;
}

export default run;
