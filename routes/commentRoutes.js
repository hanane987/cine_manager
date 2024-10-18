// routes/commentRoutes.js

import express from 'express';
import { addComment } from '../controllers/commentController.js';

const router = express.Router();

// POST route to add a new comment
router.post('/', addComment);

export default router;
