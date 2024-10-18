// routes/favoriteRoutes.js
import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoriteController.js'; // Adjust the path as needed

const router = express.Router();

// Route to add a favorite
router.post('/', addFavorite);

// Route to remove a favorite
router.delete('/', removeFavorite);

// Route to get all favorites for a user
router.get('/:utilisateur', getFavorites);

export default router;
