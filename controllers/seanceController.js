
import Seance from '../models/Seance.js';

// Create a new Seance
export const createSeance = async (req, res) => {
    try {
        const seance = new Seance(req.body);
        await seance.save();
        res.status(201).json(seance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Seances
export const getSeances = async (req, res) => {
    try {
        const seances = await Seance.find().populate('film salle admin');
        res.json(seances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Seance by ID
export const getSeanceById = async (req, res) => {
    try {
        const seance = await Seance.findById(req.params.id).populate('film salle admin');
        if (!seance) {
            return res.status(404).json({ message: 'Seance not found' });
        }
        res.json(seance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Seance
export const updateSeance = async (req, res) => {
    try {
        const seance = await Seance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!seance) {
            return res.status(404).json({ message: 'Seance not found' });
        }
        res.json(seance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Seance
export const deleteSeance = async (req, res) => {
    try {
        const seance = await Seance.findByIdAndDelete(req.params.id);
        if (!seance) {
            return res.status(404).json({ message: 'Seance not found' });
        }
        res.json({ message: 'Seance deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
