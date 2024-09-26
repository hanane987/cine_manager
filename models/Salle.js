import mongoose from 'mongoose';

const salleSchema = new mongoose.Schema({
  nomSalle: { type: String, required: true },
  capacite: { type: Number, required: true },
  typeSalle: { type: String },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Administrateur', required: true }
});


export default mongoose.model('Salle', salleSchema);
