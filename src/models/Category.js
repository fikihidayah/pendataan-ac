import mongoose from "mongoose";

export const Category = mongoose.model("Category", {
  nama: String,
  slug: String,
});
