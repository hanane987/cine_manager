// models/Rating.js
import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur', // Assuming you have a Utilisateur model
    required: true,
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film', // Assuming you have a Film model
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Rating scale from 1 to 5
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
