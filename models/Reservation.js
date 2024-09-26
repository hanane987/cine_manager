import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    seance: { type: mongoose.Schema.Types.ObjectId, ref: 'Seance', required: true },
    nombreDePlaces: { type: Number, required: true },
    status: { type: String, enum: ['Confirmée', 'Annulée'], required: true } 
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;
