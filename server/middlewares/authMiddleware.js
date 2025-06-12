const { verifyToken } = require("../utils/jwt");

async function authMiddleware(req, res) {
    try {
        const { authorization } = req.headers;

        const token = authorization.split(' ')[1];

        if (!token) {
            throw { name: 'Unauthorized', message: 'Token is invalid' };
        }
        
        const payload = verifyToken(token);
        console.log(`User ${payload.email} authenticated successfully`);

        return { user: payload }
    } catch (error) {
        console.log(error);
    }
}

module.exports = authMiddleware;