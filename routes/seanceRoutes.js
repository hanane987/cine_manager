import express from 'express';
import { createSeance, getSeances, getSeanceById, updateSeance, deleteSeance } from '../controllers/seanceController.js';
import Seance from '../models/Seance.js';
const router = express.Router();
router.get('/', async (req, res) => {
    try {
      const seances = await Seance.find(); // Fetch all seances
      res.json(seances); // Send the seances as a JSON response
    } catch (error) {
      console.error('Error fetching seances:', error);
      res.status(500).json({ message: 'Failed to load seances.' });
    }
  });
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
