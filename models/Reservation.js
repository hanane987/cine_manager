const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  seance: { type: mongoose.Schema.Types.ObjectId, ref: 'Seance', required: true },
  nombreDePlaces: { type: Number, required: true },
  status: { type: String, enum: ['Confirmée', 'Annulée'], required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);
