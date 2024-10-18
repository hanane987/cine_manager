// routes/filmRoutes.js

import express from 'express';
import {
    createFilm,
    getFilms,
    getFilmById,
    updateFilm,
    deleteFilm,
    addComment,
    addRating,
    toggleFavorite
} from '../controllers/filmController.js';

const router = express.Router();

// Film CRUD routes
router.post('/', createFilm);
router.get('/', getFilms);
router.get('/:id', getFilmById);
router.put('/:id', updateFilm);
router.delete('/:id', deleteFilm);

// Comment, Rating, and Favorite routes
router.post('/:filmId/comment', addComment);
router.post('/:filmId/rating', addRating);
router.post('/:filmId/favorite', toggleFavorite);

export default router;
