import { internalServerError, notFoundError } from "../constants/messages.js";
import Movie from "../models/movie.model.js";

// Checking if the resource exist in the database
const idChecker = async (req, res, next, id) => {
    const resourceExists = await Movie.findById(id);

    if (!resourceExists) {
      return res.status(404).json({
        success: false,
        message: notFoundError("data"),
      });
    };

    next();
        
};

export default idChecker;