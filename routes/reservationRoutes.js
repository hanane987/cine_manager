import { Router } from 'express';
import {
    createReservation,
    getReservations,
    getReservationById,
    updateReservation,
    deleteReservation
} from '../controllers/reservationController.js'; // Ensure the .js extension is added

const router = Router();

router.post('/', createReservation);
router.get('/', getReservations);
router.get('/:id', getReservationById);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;
