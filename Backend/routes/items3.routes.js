import { Router } from "express";
import verifyToken from '../utils/verifyToken.js';
import {
  getItems,
  getItem,
  postItem,
  putItem,
  deleteItem,
} from "../controllers/items3.controllers.js";

const router = Router();

// Rutas que deben ser protegidas por interacción con la Base de Datos
router.get("/items3/", verifyToken, getItems);
router.get("/items3/:id", verifyToken, getItem);
router.post("/items3/", verifyToken, postItem);
router.put("/items3/:id", verifyToken, putItem);
router.delete("/items3/:id", verifyToken, deleteItem);

// Mandar a llamar verifyToken
/*
app.get('/api/protected', verifyToken, (req, res) => {
  // Lógica
});
*/
export default router;