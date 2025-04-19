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
router.get("/items/", getItems);
router.get("/items/:id", getItem);
router.post("/items/", postItem);
router.put("/items/:id", putItem);
router.delete("/items/:id", deleteItem);

export default router;
