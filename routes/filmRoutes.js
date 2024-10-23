import express from 'express';
import {
    createFilm,
    getFilms,
    getFilmById,
    updateFilm,
    deleteFilm,
    addComment,
    addRating,
    toggleFavorite,
    getFilmStatistics
} from '../controllers/filmController.js';

const router = express.Router();
router.get('/stats', async (req, res) => {
    try {
      const totalFilms = await Film.countDocuments();
      const totalUsers = await User.countDocuments();
  
      res.json({
        totalFilms,
        totalUsers,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Film routes
router.post('/', createFilm); // Create a new film
router.get('/', getFilms); // Get all films
router.get('/:id', getFilmById); // Get a film by ID
router.put('/:id', updateFilm); // Update a film by ID
router.delete('/:id', deleteFilm); // Delete a film by ID

// Comment, Rating, Favorite routes
router.post('/:filmId/comments', addComment); // Add comment to a film
router.post('/:filmId/ratings', addRating); // Add rating to a film
router.post('/:filmId/favorite', toggleFavorite); // Toggle favorite for a film

// Film statistics route
router.get('/statistics/films', getFilmStatistics); // Get film statistics (total films)

export default router;
