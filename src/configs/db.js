import mongoose from "mongoose";

const host = "mongodb://localhost:27017";
const dbName = "ac";
const connect = await mongoose.connect(`${host}`, {
  dbName,
  // autoIndex otomatis di mongoose v7
  socketTimeoutMS: 120000,
});

if (connect) {
  console.log("database connected");
}
