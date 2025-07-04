import jwt from 'jsonwebtoken';
import config from '../config.js';

// token verification middleware
function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(' ')[1];// Extract the token from the header

    try {
        const decode = jwt.verify(token, config.JWT_USER_PASSWORD);
        req.userId = decode.id; // Attach the user ID to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
return res.status(401).json({ message: "Invalid token" });
    }
}

export default userMiddleware; // Export the middleware function
// This middleware can be used in routes to protect them and ensure that the user is authenticated before accessing certain resources or performing actions.