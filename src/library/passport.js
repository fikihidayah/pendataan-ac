import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

/**
 *
 * @param {passport} passport
 * @param user
 */
const initPassport = (passport) => {
  passport.use(
    new Strategy(
      {
        usernameField: "email", // field pada form nanti, karena defaultnya username kita rubah jadi email
        // passwordField: 'password', yang password gk usah
        passReqToCallback: true, // agar bisa custom flash message name nya, default kalau pakai object message hasilnya req.flash('error'), sementara itu digunakan untuk express-validation
      },
      async (req, email, password, done) => {
        const user = await User.findOne({ email });
        req.flash("old", req.body);
        if (!user) {
          // return done(null, false, { message: "Email tidak ditemukan" });
          return done(null, false, req.flash("passport-error", "Email tidak ditemukan"));
        }

        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
          return done(null, false, req.flash("passport-error", "Email atau password salah!"));
        }

        return done(null, user);
      }
    )
  );

  // serialize/ pertahankan session user, jika berhasil login
  passport.serializeUser((user, done) => done(null, user.email));

  // deserialize session user
  passport.deserializeUser(async (email, done) => {
    return done(null, await User.findOne({ email }));
  });
};

function isAuthenticate(req, res, next) {
  // Jadi express punya method ini untuk cek user yang sedang login
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/auth/login");
}

function isNotAuthenticate(req, res, next) {
  // Jadi express punya method ini untuk cek user yang sedang login
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }

  next();
}

export { isAuthenticate, isNotAuthenticate };
export default initPassport;
