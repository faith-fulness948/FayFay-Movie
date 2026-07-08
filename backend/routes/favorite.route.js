import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favorite.controller.js";
const router = express.Router();

router.get("/", authMiddleware, getFavorites);

router.post("/", authMiddleware, addFavorite);

router.delete("/:id", authMiddleware, removeFavorite);

export default router;