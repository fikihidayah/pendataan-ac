import "./src/configs/db.js";
import run from "./src/bootstrap.js";

const app = run();

app.listen(3001, () => console.log(`Listening pendataan ac app from http://localhost:3001`));
