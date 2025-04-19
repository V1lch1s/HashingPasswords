import { Router } from "express";
import verifyToken from '../utils/verifyToken.js';
import {
  getItems,
  getItem,
  postItem,
  putItem,
  deleteItem,
} from "../controllers/items2.controllers.js";

const router = Router();

// Rutas que deben ser protegidas por interacción con la Base de Datos
router.get("/items2/", verifyToken, getItems);
router.get("/items2/:id", verifyToken, getItem);
router.post("/items2/", verifyToken, postItem);
router.put("/items2/:id", verifyToken, putItem);
router.delete("/items2/:id", verifyToken, deleteItem);

export default router;
