const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  historiqueReservations: { type: String, default: '' }
});

module.exports = mongoose.model('Client', clientSchema);
