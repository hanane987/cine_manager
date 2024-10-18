// models/Comment.js

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  filmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Changed to 'utilisateur'
  content: { type: String, required: true }, // Ensure content is required
  rating: { type: Number, min: 1, max: 5, required: true },
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
