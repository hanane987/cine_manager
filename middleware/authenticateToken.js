import jwt from 'jsonwebtoken';

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
      // Get token from headers
      const token = req.headers['authorization']?.split(' ')[1];
      console.log('Token:', token); // Log the token
      
      if (!token) {
          return res.status(401).json({ message: 'Access denied. No token provided.' });
      }

      try {
          // Verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log('Decoded Token:', decoded); // Log decoded token
          req.user = decoded;
          
          // Check if user role is allowed
          if (roles.length && !roles.includes(req.user.role)) {
              return res.status(403).json({ message: 'Forbidden. You do not have access to this resource.' });
          }

          next();
      } catch (error) {
          console.error('Token Error:', error); // Log any errors
          return res.status(400).json({ message: 'Invalid token.' });
      }
  };
};

export default authMiddleware;
