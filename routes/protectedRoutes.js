import express from 'express';
import authMiddleware from '../middleware/authenticateToken.js'; // Adjust the path as needed

const router = express.Router();

// Protected resource
router.get('/protected-resource', authMiddleware(['Client', 'Administrateur']), (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected resource!', user: req.user });
});

export default router;
