import express from 'express';
import {
    createSeance,
    getSeances,
    getSeanceById,
    updateSeance,
    deleteSeance,
    getSeancesByFilmId
} from '../controllers/seanceController.js';

const router = express.Router();

// Route to create a new Seance
router.post('/', createSeance);

// Route to fetch all Seances
router.get('/', getSeances);

// Route to fetch a single Seance by ID
router.get('/:id', getSeanceById);

// Route to update a Seance
router.put('/:id', updateSeance);

// Route to delete a Seance
router.delete('/:id', deleteSeance);

// Route to fetch Seances by Film ID
router.get('/film/:id', getSeancesByFilmId);

export default router;
