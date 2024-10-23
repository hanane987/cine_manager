// models/Favorite.js
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  utilisateur: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Utilisateur', // Ensure this model is correctly defined
    required: true 
  },
  film: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Film', // Ensure this model is correctly defined
    required: true 
  },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
