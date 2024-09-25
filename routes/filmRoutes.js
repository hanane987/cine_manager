// routes/filmRoutes.js

import express from 'express';
import {
    createFilm,
    getFilms,
    getFilmById,
    updateFilm,
    deleteFilm
} from '../controllers/filmController.js';

const router = express.Router();

// Create a film
router.post('/', createFilm);

// Get all films
router.get('/', getFilms);

// Get a film by ID
router.get('/:id', getFilmById);

// Update a film by ID
router.put('/:id', updateFilm);

// Delete a film by ID
router.delete('/:id', deleteFilm);

export default router;
