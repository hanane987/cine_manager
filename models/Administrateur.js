const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listeAdmins: { type: String, default: '' }
});

module.exports = mongoose.model('Administrateur', adminSchema);