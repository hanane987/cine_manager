// controllers/favoriteController.js
import Favorite from './models/Favorite.js'; // Adjust the path as needed

// Add a favorite
export const addFavorite = async (req, res) => {
  const { utilisateur, film } = req.body;

  try {
    const newFavorite = new Favorite({ utilisateur, film });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(400).json({ message: 'Error adding favorite', error: error.message });
  }
};

// Remove a favorite
export const removeFavorite = async (req, res) => {
  const { utilisateur, film } = req.body;

  try {
    const deletedFavorite = await Favorite.findOneAndDelete({ utilisateur, film });
    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(400).json({ message: 'Error removing favorite', error: error.message });
  }
};

// Get all favorites for a user
export const getFavorites = async (req, res) => {
  const { utilisateur } = req.params;

  try {
    const favorites = await Favorite.find({ utilisateur }).populate('film'); // Populate film details
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
};
