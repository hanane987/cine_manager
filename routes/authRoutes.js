import express from 'express';
import { register, login , getAllUsers, toggleUserBan} from '../controllers/authController.js'; 
import authMiddleware from '../middleware/authenticateToken.js'; 

const router = express.Router();

// Register route 
router.post('/register', register); 

// Login route 
router.post('/login', login);
router.get('/users', getAllUsers);

// Route to ban/unban a user
router.patch('/users/:userId/ban', toggleUserBan);


router.get('/protected', authMiddleware(['Client', 'Administrateur']), (req, res) => {
    res.send('This is a protected route for Client and Administrateur roles.');
});

    export default router;
