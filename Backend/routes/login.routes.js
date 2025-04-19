import { Router } from "express";
import { login, signUp } from "../controllers/login.controllers.js";

const router = Router();

// Rutas expuestas al cliente
router.post("/login/", login);
router.post("/signUp/", signUp);

export default router;

// Usuarios de ejemplo
// usuario1 || amelia&&$$45
// ejemplo  || 123456
