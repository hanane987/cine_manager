// models/Reservation.js
import mongoose from 'mongoose';
import Client from './Client.js'; // Ensure the path is correct

const reservationSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    seance: { type: mongoose.Schema.Types.ObjectId, ref: 'Seance', required: true },
    nombreDePlaces: { type: Number, required: true },
    status: { type: String, enum: ['Confirmée', 'Annulée'], required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
