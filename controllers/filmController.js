

import Film from '../models/Film.js';

// Create a new film
export const createFilm = async (req, res) => {
    const { titre, duree, genre, description, admin } = req.body;

    try {
        const newFilm = new Film({ titre, duree, genre, description, admin });
        await newFilm.save();
        res.status(201).json({ message: 'Film created successfully', film: newFilm });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all films
export const getFilms = async (req, res) => {
    try {
        const films = await Film.find();
        res.status(200).json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single film by ID
export const getFilmById = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json(film);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a film by ID
export const updateFilm = async (req, res) => {
    try {
        const film = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json({ message: 'Film updated successfully', film });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a film by ID
export const deleteFilm = async (req, res) => {
    try {
        const film = await Film.findByIdAndDelete(req.params.id);
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json({ message: 'Film deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
