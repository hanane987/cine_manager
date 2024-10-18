// models/Favorite.js
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
