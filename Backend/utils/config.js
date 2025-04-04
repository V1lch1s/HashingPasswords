import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Obtengo el directorio actual
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargo las variables de entorno privadas (.env)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Constante de autenticación con pimienta
export const config = {
    auth: {
        pepper: process.env.PEPPER,
    }
};