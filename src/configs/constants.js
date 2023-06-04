import { fileURLToPath } from "url";
import path from "path";

// Karena dalam es module tidak terdapat constanct __dirname maka buat sendiri
const __filename = fileURLToPath(import.meta.url + "./../../");
/**
 *  folder root
 */
const __dirname = path.dirname(__filename);

export { __filename, __dirname };
