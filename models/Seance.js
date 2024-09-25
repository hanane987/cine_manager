import mongoose from 'mongoose';

const seanceSchema = new mongoose.Schema({
  horaire: { type: Date, required: true },
  film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
  salle: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true },
  tarif: { type: Number, required: true },
  placesDisponibles: { type: Number, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Administrateur', required: true }
});


const Seance = mongoose.model('Seance', seanceSchema);
export default Seance; 
