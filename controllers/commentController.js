// controllers/commentController.js

import Comment from '../models/Comment.js';

// Add a new comment
export const addComment = async (req, res) => {
  const { filmId, utilisateur, content, rating } = req.body; // Ensure content and utilisateur are included

  try {
    const newComment = new Comment({ filmId, utilisateur, content, rating });
    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(400).json({ message: 'Error adding comment', error: error.message });
  }
};
