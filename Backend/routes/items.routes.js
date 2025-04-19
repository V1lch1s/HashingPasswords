import { Router } from "express";
import verifyToken from '../utils/verifyToken.js';
import {
  getItems,
  getItem,
  postItem,
  putItem,
  deleteItem,
} from "../controllers/items.controllers.js";

const router = Router();

// Rutas que deben ser protegidas por interacción con la Base de Datos
router.get("/items/", verifyToken, getItems);
router.get("/items/:id", verifyToken, getItem);
router.post("/items/", verifyToken, postItem);
router.put("/items/:id", verifyToken, putItem);
router.delete("/items/:id", verifyToken, deleteItem);

export default router;
