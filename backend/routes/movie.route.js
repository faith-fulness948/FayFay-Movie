import express from "express";
import { createMovie, deleteMovie, getAllMovies, getAMovie, updateMovie } from "../controllers/movie.controller.js";
import idChecker from "../middlewares/idChecker.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js"

const router = express.Router();

router.param("id", idChecker);

router.route("/")
    .post(authMiddleware, adminMiddleware, createMovie)
    .get(getAllMovies);

router.route("/:id")
    .get(getAMovie)
    .put(updateMovie)
    .delete(deleteMovie);

export default router;