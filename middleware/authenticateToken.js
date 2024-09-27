import jwt from 'jsonwebtoken';

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        // Get token from headers
        const token = req.headers['authorization']?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Save user information to request object
            
            // Check if user role is allowed
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden. You do not have access to this resource.' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            return res.status(400).json({ message: 'Invalid token.' });
        }
    };
};

export default authMiddleware;
