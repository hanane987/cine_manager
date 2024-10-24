import express from 'express';
import { register, login , getAllUsers, toggleUserBan} from '../controllers/authController.js'; 
import authMiddleware from '../middleware/authenticateToken.js'; 

const router = express.Router();
const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/users'); // Adjust if needed
      const data = await response.json();
      console.log(data); // Log the fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
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
