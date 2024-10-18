// controllers/ratingController.js
import Rating from '../models/Rating.js';

export const addRating = async (req, res) => {
  const { utilisateur, film, score } = req.body; // Extract fields from the request body

  try {
    const newRating = new Rating({ utilisateur, film, score });
    await newRating.save(); // Save the rating
    res.status(201).json(newRating); // Respond with the created rating
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(400).json({ message: 'Error adding rating', error: error.message });
  }
};

// Route to fetch ratings for a specific film
export const getFilmRatings = async (req, res) => {
  const { filmId } = req.params;

  try {
    const ratings = await Rating.find({ film: filmId }).populate('utilisateur'); // Populate the user field
    res.json(ratings); // Respond with the ratings
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ message: 'Failed to load ratings.' });
  }
};
