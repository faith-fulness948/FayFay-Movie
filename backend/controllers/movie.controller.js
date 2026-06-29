import { alreadyExistError, createSuccessMsg, internalServerError, notFoundError, requiredFieldError, successDeleteMsg, successUpdateMsg } from "../constants/messages.js";
import Movie from "../models/movie.model.js";

// Create
export const createMovie = async (req, res) => {
    try {
        const movie = req.body;

        
        const newMovie = await new Movie(movie);

        const { title, genre, year} = newMovie;

        // checking if a required field is empty
        if(!title || !genre || !year) {
            return res.status(400).json({
                success: false,
                message: requiredFieldError,
            });
        };

        // checking if movie exist
        const existingMovie = await Movie.findOne({title});

        if(existingMovie){
            return res.status(400).json({
                success: false,
                message: alreadyExistError("Movie"),
            });
        };

        await newMovie.save();

        const {__v, ...movieResponse} = newMovie.toObject();

        res.status(201).json({
            success: true,
            message: createSuccessMsg("Movie"),
            data: {
                movie: movieResponse,
            }
        });

    } catch (error) {
        console.error("Create a movie error:", error);
        
        res.status(500).json({
            success: false,
            message: internalServerError,
        });
    };
}

// Read all
export const getAllMovies = async (req, res) => {
    try {
        const movies = (await Movie.find().sort({ createdAt: -1 }).select("-__v"));

        // check if movies collection is empty
        if (movies.length < 1) {
            return res.status(404).json({
                success: false,
                message: notFoundError("any movie")
            });
        };

        res.status(200).json({
            success: true,
            message: "Movies successfully fetched!",
            data: {
                movies: movies,
            }
        });
    } catch (error) {
        console.error("Get all movies error:", error);
        
        res.status(500).json({
            success: false,
            message: internalServerError,
        });
    };
};

// Read one
export const getAMovie = async (req, res) => {
    try {
        const id = req.params.id;

        const movie = await Movie.findById(id).select("-__v");

        res.status(200).json({
            success: true,
            message: "Movie successfully fetched!",
            data: {
                movie: movie,
            }
        });

    } catch (error) {
        console.error("Get a movie error:", error);
        
        res.status(500).json({
            success: false,
            message: internalServerError,
        });
    }
}

// Update
export const updateMovie = async (req, res) => {
    try {
        const id = req.params.id;

        const update = req.body;

        const updatedMovie = await Movie.findByIdAndUpdate(id, update, {new: true, runValidators: true});

        const {__v, ...movieResponse} = updatedMovie.toObject();

        res.status(200).json({
            success: true,
            message: successUpdateMsg("Movie"),
            data: {
                movie: movieResponse,
            }
        })
    } catch (error) {
        console.error("Update a movie error:", error);
        
        res.status(500).json({
            success: false,
            message: internalServerError,
        });
    }
}

// delete
export const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedMovie = await Movie.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: successDeleteMsg("Movie"),
        })

    } catch (error) {
        console.error("Delete a movie error:", error);
        
        res.status(500).json({
            success: false,
            message: internalServerError,
        });
    }
}