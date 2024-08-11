const { generateJwtToken } = require('../helper/jwtToken');
const User = require('../models/userModel');


const getUser = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { password, ...userData } = user.toObject();
        const token = generateJwtToken(email);
        return res.status(200).json({ message: 'Login successful', token, displayName: user.name, user: userData });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getUser };