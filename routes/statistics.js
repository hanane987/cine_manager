import express from 'express';
import { getStatistics } from '../controllers/statisticsController.js';

const router = express.Router();

// Route for fetching statistics
router.get('/stats', getStatistics);

export default router;
