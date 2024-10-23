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
        console.error('Error fetching seances:', error);
        res.status(500).json({ message: 'Failed to load seances.' });
    }
};

// Get Seances by Film ID
export const getSeancesByFilmId = async (req, res) => {
    const filmId = req.params.id;

    try {
        const seances = await Seance.find({ film: filmId }).populate('film salle admin');
        if (!seances.length) {
            return res.status(404).json({ message: 'No seances found for this film' });
        }
        res.status(200).json(seances);
    } catch (error) {
        console.error('Error fetching seances:', error);
        res.status(500).json({ message: 'Error fetching seances' });
    }
};

// Get a single Seance by ID
export const getSeanceById = async (req, res) => {
    try {
        const { id } = req.params; 
        const seance = await Seance.findById(id).populate('film salle admin');
        if (!seance) {
            return res.status(404).json({ message: 'Seance not found.' });
        }
        res.json(seance);
    } catch (error) {
        console.error('Error fetching seance by ID:', error);
        res.status(500).json({ message: 'Failed to load seance.' });
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
