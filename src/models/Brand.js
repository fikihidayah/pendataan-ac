import mongoose from "mongoose";

const Brand = mongoose.model("Brand", {
  nama: {
    type: String,
    maxLength: 100,
    trim: true,
  },
  logo: String,
  slug: {
    type: String,
    maxLength: 300,
  },
});

export { Brand };
