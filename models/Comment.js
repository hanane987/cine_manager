// models/Comment.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  filmId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Film', 
    required: true 
  },
  utilisateur: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Utilisateur', // Use 'Utilisateur' for consistency with the Rating model
    required: true 
  },
  content: { 
    type: String, 
    required: true // Ensure content is required
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true // Make sure rating is required if you want it with the comment
  },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

export default mongoose.model('Comment', commentSchema);
