import "./src/configs/db.js";
import "dotenv/config";
import run from "./src/bootstrap.js";

const app = run();
app.listen(process.env.PORT, () => console.log(`Listening pendataan ac app from http://localhost:${process.env.PORT}`));
