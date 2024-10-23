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
import mediaRoutes from './routes/mediaRoutes.js';
import statistics from './routes/statistics.js';


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

// Use imported routes
app.use('/api/auth', authRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/salles', salleRoutes);
app.use('/api/seances', seanceRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api', protectedRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api', statistics);

// Default route for unmatched endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
