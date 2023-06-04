import mongoose, { Schema, ObjectId } from "mongoose";

const User = mongoose.model("User", {
  email: String,
  name: String,
  password: String,
});

export { User };
