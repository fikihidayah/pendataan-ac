import mongoose, { Schema, ObjectId } from "mongoose";

// Membuat model schema untuk collection produk
const gambarSchema = new Schema({
  nama: {
    type: String,
    maxLength: 100,
  },
  path: String,
});

const produkSchema = new Schema(
  {
    nama: {
      type: String,
      index: true,
      maxLength: 100,
    },
    slug: {
      type: String,
      maxLength: 300,
    },
    kd_produk: {
      type: String,
      unique: true, // set unique
    },
    kategori: {
      type: ObjectId,
      ref: "Category",
    }, // tipe data object id, mau di reference kan
    deskripsi: String, // string di mongoDB tidak memiliki batasan, kecuali di definisikan
    gambar: [gambarSchema],
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
    harga: Number,
    diskon: {
      type: Number,
      max: 100,
      min: 0,
    },
    stock: Number,
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", produkSchema);
