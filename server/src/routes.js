const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/authRoutes');
const geminiRoutes = require('./routes/geminiRoutes');
const userRoutes = require('./routes/userRoutes');


// Routes
router.use('/auth', authRoutes);
router.use('/ai', geminiRoutes);
router.use('/user', userRoutes);




module.exports = router; 