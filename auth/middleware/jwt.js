const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'Token não fornecido!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Token inválido!' });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;