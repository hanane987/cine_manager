import Utilisateur from '../models/Utilisateur.js';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;

    // Log incoming data for debugging
    console.log('Incoming data:', req.body);

    // Validate required fields
    if (!nom || !email || !mot_de_passe || !role) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Validate role
    if (!['Client', 'Administrateur'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role.' });
    }

    // Validate email format (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        const newUser = new Utilisateur({ nom, email, mot_de_passe, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle specific MongoDB errors
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ error: 'Email already exists.' });
        }
        res.status(500).json({ error: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    console.log('Login attempt:', req.body); // Debugging line
    const { email, mot_de_passe } = req.body;

    // Validate required fields
    if (!email || !mot_de_passe) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const utilisateur = await Utilisateur.findOne({ email });
        if (!utilisateur) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await utilisateur.comparePassword(mot_de_passe);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: utilisateur._id, role: utilisateur.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error); // Debugging line
        res.status(500).json({ error: error.message });
    }
};
