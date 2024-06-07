const express = require('express');
const { register, login, protected } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authMiddleware, protected);

module.exports = router;
