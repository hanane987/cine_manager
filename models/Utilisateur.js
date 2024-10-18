// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs'; 

// const utilisateurSchema = new mongoose.Schema({
//   nom: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mot_de_passe: { type: String, required: true },
//   role: { type: String, enum: ['Client', 'Administrateur'], required: true }
// });

// // Hash password before saving
// utilisateurSchema.pre('save', async function (next) {
//   if (!this.isModified('mot_de_passe')) return next();
//   this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, 10);
//   next();
// });

// // Method to compare password
// utilisateurSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.mot_de_passe);
// };

// const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);
// export default Utilisateur;
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const utilisateurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mot_de_passe: { type: String, required: true },
    role: { type: String, enum: ['Client', 'Administrateur'], required: true },
    type_compte: { type: String, enum: ['subscribed', 'basic'], default: 'subscribed' }
});

// Hash password before saving
utilisateurSchema.pre('save', async function (next) {
    if (!this.isModified('mot_de_passe')) return next();
    this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, 10);
    next();
});

// Method to compare password
utilisateurSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.mot_de_passe);
};

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);
export default Utilisateur;
