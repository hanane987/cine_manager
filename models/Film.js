// models/film.js

import mongoose from 'mongoose';

// Define an enum for the genre types
const genreEnum = ['Action', 'Drama', 'Comedy', 'Horror'];

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true, // Duration in minutes
    },
    genre: {
        type: String,
        enum: genreEnum, // Set the enum for genre
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
});

const Film = mongoose.model('Film', filmSchema);
export default Film;
