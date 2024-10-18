// ratingRoutes.js
import express from 'express';
import { addRating } from '../controllers/ratingController.js'; // Adjust the import path as needed

const router = express.Router();

// Define the POST route for adding a rating
router.post('/', addRating); // Route to handle adding a rating

export default router;
