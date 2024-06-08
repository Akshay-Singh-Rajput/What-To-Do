const admin = require('firebase-admin');
const serviceAccount = require('../wtd-web-app-firebase-adminsdk-wx3f4-e59c340768.json');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { generateJwtToken } = require('../helper/jwtToken');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Function to handle Google sign-in and return a JWT token
const handleGoogleSignIn = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ error: 'ID token is required' });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        // Check if the user already exists
        let user = await User.findOne({ uid });

        if (!user) {
            // User does not exist, create a new user
            user = await User.create({ uid, email, name, picture });
        } else {
            // User already exists, update the user's information
            user.name = name;
            user.picture = picture;
            await user.save();
        }

        // Generate JWT token
        const token = generateJwtToken(email);

        // Return the token
        return res.status(200).json({ message: 'Login successful', token, displayName: user.name, });
} catch (error) {
        console.error('Error handling Google sign-in:', error);
        return res.status(500).json({ error: 'Failed to handle Google sign-in' });
    }
};


module.exports = { handleGoogleSignIn };

