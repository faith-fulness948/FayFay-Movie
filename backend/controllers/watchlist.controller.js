import Watchlist from "../models/watchlist.model.js";

// Get all watchlist movies
export const getWatchlist = async (req, res) => {
    try {
        const watchlist = await Watchlist.find({
            user: req.user._id
        }).populate("movie");

        res.status(200).json({
            success: true,
            watchlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Add movie to watchlist
export const addWatchlist = async (req, res) => {

    try {

        const { movieId } = req.body;

        // Prevent duplicates
        const exists = await Watchlist.findOne({
            user: req.user._id,
            movie: movieId
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Movie already exists in watchlist."
            });
        }

        const watchlist = await Watchlist.create({
            user: req.user._id,
            movie: movieId
        });

        res.status(201).json({
            success: true,
            message: "Movie added to watchlist.",
            watchlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Remove movie from watchlist
export const removeWatchlist = async (req, res) => {

    try {

        await Watchlist.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Movie removed from watchlist."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};