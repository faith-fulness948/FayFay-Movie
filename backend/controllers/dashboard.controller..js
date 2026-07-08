import Watchlist from "../models/watchlist.model.js";
import Favorite from "../models/favourite.model.js";

export const getDashboard = async (req, res) => {

    try {

        const userId = req.user.id;

        const watchlist = await Watchlist.find({ user: userId })
            .populate("movie");

        const favorites = await Favorite.find({ user: userId })
            .populate("movie");

        res.status(200).json({

            success: true,

            dashboard: {

                watchlist,

                favorites,

                totalWatchlist: watchlist.length,

                totalFavorites: favorites.length

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};