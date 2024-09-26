import Reservation from '../models/Reservation.js';
import Utilisateur from '../models/Utilisateur.js'; 

// Create a new Reservation
export const createReservation = async (req, res) => {
    try {
        const { utilisateurId, seanceId, nombreDePlaces, status = 'Confirmée' } = req.body; 
        const reservation = new Reservation({
            utilisateur: utilisateurId,
            seance: seanceId,
            nombreDePlaces,
            status // Include status
        });
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all Reservations
export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('utilisateur seance'); // Populate utilisateur
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single Reservation by ID
export const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('utilisateur seance'); // Populate utilisateur
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




// Delete a Reservation by ID
export const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
