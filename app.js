// Import dependencies
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes.js';
import filmRoutes from './routes/filmRoutes.js';
import salleRoutes from './routes/salleRoutes.js';
import seanceRoutes from './routes/seanceRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js'; 

// Import models
import Film from './models/Film.js';
import Seance from './models/Seance.js';

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS with specific frontend origin and allowed methods/headers
app.use(
  cors({
    origin: 'http://localhost:3001', // Adjust based on your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION)

  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process if connection fails
  });

// Route to fetch all films
app.get('/api/films', async (req, res) => {
  try {
    const films = await Film.find(); // Fetch all films
    res.status(200).json(films); // Send JSON response
  } catch (error) {
    console.error('Error fetching films:', error);
    res.status(500).json({ message: 'Failed to load films.' });
  }
});

// Route to fetch all seances with populated fields
app.get('/api/seances', async (req, res) => {
  try {
    const seances = await Seance.find().populate('film salle admin'); // Populate references
    res.status(200).json(seances); // Send JSON response
  } catch (error) {
    console.error('Error fetching seances:', error);
    res.status(500).json({ message: 'Failed to load seances.' });
  }
});

// Use imported routes
app.use('/api/auth', authRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/salles', salleRoutes);
app.use('/api/seances', seanceRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api', protectedRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);

// Default route for unmatched endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
