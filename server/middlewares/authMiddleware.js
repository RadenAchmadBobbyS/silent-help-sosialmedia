const { verifyToken } = require("../utils/jwt");

async function authMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;

        const token = authorization.split(' ')[1];

        if (!token) {
            throw { name: 'Unauthorized', message: 'Token is invalid' };
        }
        
        const payload = verifyToken(token);
        console.log(`User ${payload.email} authenticated successfully`);

        req.user = payload; // Attach user info to the request object
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = authMiddleware;
// This middleware checks if the user is authenticated by verifying the JWT token.