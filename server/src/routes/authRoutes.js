const express = require('express');
const { register, login, protected } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { handleGoogleSignIn } = require('../services/firebaseAuth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', handleGoogleSignIn);

router.get('/protected', authMiddleware, protected);

module.exports = router;
