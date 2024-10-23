import express from 'express';
import {
    createSalle,
    getAllSalles,
    getSalleById,
    updateSalle,
    deleteSalle
} from '../controllers/salleController.js';

const router = express.Router();

router.post('/', createSalle);

router.get('/', getAllSalles);

router.get('/:id', getSalleById);

router.put('/:id', updateSalle);

router.delete('/:id', deleteSalle);

export default router;
