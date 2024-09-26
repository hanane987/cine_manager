import { Router } from 'express';
import {
    createReservation,
    getReservations,
    getReservationById,
    deleteReservation
} from '../controllers/reservationController.js'; 

const router = Router();

router.post('/', createReservation);
router.get('/', getReservations);
router.get('/:id', getReservationById);
router.delete('/:id', deleteReservation);

export default router;
