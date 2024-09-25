import express from 'express';
import { createSeance, getSeances, getSeanceById, updateSeance, deleteSeance } from '../controllers/seanceController.js';

const router = express.Router();

// Create a Seance
router.post('/', createSeance);

// Get all Seances
router.get('/', getSeances);

// Get a Seance by ID
router.get('/:id', getSeanceById);

// Update a Seance
router.put('/:id', updateSeance);

// Delete a Seance
router.delete('/:id', deleteSeance);

export default router;
