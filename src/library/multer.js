import multer from "multer";
import path from "path";
import { __dirname } from "./../configs/constants.js";
import fs from "fs";
import _ from "lodash";

// Multer
// Adalah module yang digunakan untuk parsing data file yang di upload sekaligus mengupload file
// multer berjalan sebagai middleware, yang seharusnya metadata file akan bisa di akses setelah mideware di jalanakan
// jadi kalau mau buat validasi harus jalankan middeware multer upload nya dlu
// Konfigurasi disk storage untuk upload file

// konfigurasi disk
const productDisk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/public/uploads/images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const brandDisk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/public/uploads/logo"));
  },
  filename: function (req, file, cb) {
    // check jika nama ada maka akan ditambahkan -1 diangkanya
    const fileName = incrementFileName(file);
    cb(null, fileName);
  },
});

/**
 * Melakukan increment pada file jika sama
 * @param {globalThis.Express.Multer.File} file
 * @returns {String}
 */
const incrementFileName = (file) => {
  let fileName = "";

  let dest = path.join(__dirname, "/public/uploads/logo", file.originalname);
  const pathParsed = path.parse(dest);
  let numberOfSame = Number(fileName.split("-").at(-1)); // koversi ke number tetapi jika tidak valid maka NaN
  fileName = pathParsed.name;

  let sameNumber = 0;
  while (fs.existsSync(dest)) {
    fileName = pathParsed.name; // reset lagi
    if (!_.isNaN(numberOfSame)) {
      sameNumber++; // increment hasilnya
    }
    fileName += "-" + sameNumber;
    dest = path.join(__dirname, "/public/uploads/logo", fileName + pathParsed.ext);
  }

  fileName += pathParsed.ext;
  return fileName;
};

export { productDisk, brandDisk, multer };
