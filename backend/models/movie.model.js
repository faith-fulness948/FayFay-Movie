import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        // title
        title: {
            type: String,
            required: true,
            unique: true,
            minLength: 1
        },

        // genre
        genre: {
            type: String,
            required: true,
        },

        // actors
        actors: {
            type: Array,
            required: true,
            default: ["NA"]
        },

        // year
        year: {
            type: Number,
            required: true,
        },

        // notes
        synopsis: {
            type: String,
            maxLength: 200,
        },

    },
    {
        timestamps: true
    },
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;