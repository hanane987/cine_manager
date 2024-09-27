import express from 'express';
import { register, login } from '../controllers/authController.js'; 
import authMiddleware from '../middleware/authenticateToken.js'; 

const router = express.Router();

// Register route 
router.post('/register', register); 

// Login route 
router.post('/login', login);


router.get('/protected', authMiddleware(['Client', 'Administrateur']), (req, res) => {
    res.send('This is a protected route for Client and Administrateur roles.');
});

export default router;
