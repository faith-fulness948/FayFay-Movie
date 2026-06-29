import express from "express";
import { createMovie, deleteMovie, getAllMovies, getAMovie, updateMovie } from "../controllers/movie.controller.js";
import idChecker from "../middlewares/idChecker.js";

const router = express.Router();

router.param("id", idChecker);

router.route("/")
    .post(createMovie)
    .get(getAllMovies);

router.route("/:id")
    .get(getAMovie)
    .put(updateMovie)
    .delete(deleteMovie);

export default router;