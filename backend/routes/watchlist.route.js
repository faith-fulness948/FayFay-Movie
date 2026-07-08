import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addWatchlist, getWatchlist, removeWatchlist } from "../controllers/watchlist.controller.js";
const router = express.Router();

router.get("/", authMiddleware, getWatchlist);

router.post("/", authMiddleware, addWatchlist);

router.delete("/:id", authMiddleware, removeWatchlist);

export default router;