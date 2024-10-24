// routes/commentRoutes.js

import express from 'express';
import { addComment, getCommentsByFilmId } from '../controllers/commentController.js';

const router = express.Router();

// Route to add a comment
router.post('/', addComment);

// Route to get comments by film ID
router.get('/film/:filmId', getCommentsByFilmId);

export default router;
