import Film from '../models/Film.js';
import Comment from '../models/Comment.js';
import Rating from '../models/Rating.js';
import Favorite from '../models/Favorite.js';

// Create a new film
export const createFilm = async (req, res) => {
    const { title, year, duration, genre, description, imageUrl } = req.body;

    if (!title || !year || !duration || !genre || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newFilm = new Film({ title, year, duration, genre, description, imageUrl });
        await newFilm.save();
        res.status(201).json({ message: 'Film created successfully', film: newFilm });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        
        // Fetch comments for the film
        const comments = await Comment.find({ filmId: film._id }).populate('utilisateur', 'name');
        
        res.status(200).json({
            film,
            comments, // Include comments in the response
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a film by ID
export const updateFilm = async (req, res) => {
    try {
        const updatedFilm = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFilm) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json({ message: 'Film updated successfully', film: updatedFilm });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a film by ID
export const deleteFilm = async (req, res) => {
    try {
        const deletedFilm = await Film.findByIdAndDelete(req.params.id);
        if (!deletedFilm) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json({ message: 'Film deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a comment to a film
export const addComment = async (req, res) => {
    const { filmId } = req.params;
    const { utilisateur, content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const comment = new Comment({ filmId, utilisateur, content });
        await comment.save();
        res.status(201).json({ message: 'Comment added', comment });
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

// Add a rating to a film
export const addRating = async (req, res) => {
    const { filmId } = req.params;
    const { utilisateur, score } = req.body;

    if (score < 1 || score > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    try {
        const rating = new Rating({ filmId, utilisateur, score });
        await rating.save();
        res.status(201).json({ message: 'Rating added', rating });
    } catch (error) {
        res.status(500).json({ message: 'Error adding rating', error });
    }
};

// Toggle favorite for a film
export const toggleFavorite = async (req, res) => {
    const { filmId } = req.params;
    const { utilisateur } = req.body;

    try {
        const existingFavorite = await Favorite.findOne({ filmId, utilisateur });

        if (existingFavorite) {
            await existingFavorite.deleteOne();
            res.json({ message: 'Removed from favorites' });
        } else {
            const favorite = new Favorite({ filmId, utilisateur });
            await favorite.save();
            res.status(201).json({ message: 'Added to favorites', favorite });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error toggling favorite', error });
    }
};

// Get film statistics (total number of films)
export const getFilmStatistics = async (req, res) => {
    try {
        const totalFilms = await Film.countDocuments();
        res.status(200).json({
            totalFilms
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
