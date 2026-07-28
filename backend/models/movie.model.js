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

        type: {
            type: String,
            enum: ["Movie", "Series"],
            required: true
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
            // Official YouTube trailer
        trailerLink: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true
    },
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;