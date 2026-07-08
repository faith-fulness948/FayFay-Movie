import Favorite from "../models/favourite.model.js";

// Get favorite movies
export const getFavorites = async (req, res) => {

    try {

        const favorites = await Favorite.find({
            user: req.user._id
        }).populate("movie");

        res.status(200).json({
            success: true,
            favorites
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Add favorite
export const addFavorite = async (req, res) => {

    try {

        const { movieId } = req.body;

        const exists = await Favorite.findOne({
            user: req.user._id,
            movie: movieId
        });

        if (exists) {

            return res.status(400).json({
                success: false,
                message: "Movie already exists in favorites."
            });

        }

        const favorite = await Favorite.create({
            user: req.user._id,
            movie: movieId
        });

        res.status(201).json({
            success: true,
            message: "Movie added to favorites.",
            favorite
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Remove favorite
export const removeFavorite = async (req, res) => {

    try {

        await Favorite.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Movie removed from favorites."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};