
import Salle from '../models/Salle.js'; 

// Create a new salle
export const createSalle = async (req, res) => {
    try {
        const salle = new Salle(req.body
        );
        await salle.save();
        res.status(201).json(salle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all salles
export const getAllSalles = async (req, res) => {
    try {
        const salles = await Salle.find();
        res.status(200).json(salles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a salle by ID
export const getSalleById = async (req, res) => {
    try {
        const salle = await Salle.findById(req.params.id);
        if (!salle) {
            return res.status(404).json({ message: 'Salle not found' });
        }
        res.status(200).json(salle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a salle by ID
export const updateSalle = async (req, res) => {
    try {
        const salle = await Salle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!salle) {
            return res.status(404).json({ message: 'Salle not found' });
        }
        res.status(200).json(salle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a salle by ID
export const deleteSalle = async (req, res) => {
    try {
        const salle = await Salle.findByIdAndDelete(req.params.id);
        if (!salle) {
            return res.status(404).json({ message: 'Salle not found' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
