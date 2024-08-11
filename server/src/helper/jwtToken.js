const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function generateJwtToken(email) {
    // { expiresIn: '1h'; }
    return jwt.sign({ email }, SECRET_KEY);
}

module.exports = { generateJwtToken };