import Utilisateur from '../models/Utilisateur.js';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;
    console.log('Incoming data:', req.body);
    if (!nom || !email || !mot_de_passe || !role) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
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
        if (error.code === 11000) { 
            return res.status(400).json({ error: 'Email already exists.' });
        }
        res.status(500).json({ error: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    console.log('Login attempt:', req.body); 
    const { email, mot_de_passe } = req.body;

  
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
        console.error('Login error:', error); 
        res.status(500).json({ error: error.message });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await Utilisateur.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ban or unban a user
export const toggleUserBan = async (req, res) => {
    const { userId } = req.params; // Get user ID from request params

    try {
        const user = await Utilisateur.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Toggle banned status
        user.banned = !user.banned;
        await user.save();

        res.json({ message: `User has been ${user.banned ? 'banned' : 'unbanned'}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};