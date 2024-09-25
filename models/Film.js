// models/Film.js

import mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    duree: { type: Number, required: true },
    genre: { type: String },
    description: { type: String },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Administrateur', required: true }
});

// Exporting the Film model using ES Module syntax
const Film = mongoose.model('Film', filmSchema);
export default Film;
