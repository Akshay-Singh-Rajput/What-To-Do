const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    const token = req.headers[ 'authorization' ];
    if (!token) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err)
        res.status(401).json({ error: 'Unauthorized' });
    }
};
