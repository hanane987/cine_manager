// controllers/commentController.js

import Comment from '../models/Comment.js';

// Add a new comment
export const addComment = async (req, res) => {
  const { filmId, utilisateur, content, rating } = req.body;

  try {
    const newComment = new Comment({ filmId, utilisateur, content, rating });
    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(400).json({ message: 'Error adding comment', error: error.message });
  }
};

// Get comments by film ID
export const getCommentsByFilmId = async (req, res) => {
  const { filmId } = req.params;

  try {
    const comments = await Comment.find({ filmId }).populate('utilisateur', 'name'); // Optionally populate user info
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};
