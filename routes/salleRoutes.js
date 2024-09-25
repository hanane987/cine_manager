import express from 'express';
import {
    createSalle,
    getAllSalles,
    getSalleById,
    updateSalle,
    deleteSalle
} from '../controllers/salleController.js';

const router = express.Router();

// Create salle route
router.post('/', createSalle);

// Get all salles route
router.get('/', getAllSalles);

// Get salle by ID route
router.get('/:id', getSalleById);

// Update salle by ID route
router.put('/:id', updateSalle);

// Delete salle by ID route
router.delete('/:id', deleteSalle);

export default router;
