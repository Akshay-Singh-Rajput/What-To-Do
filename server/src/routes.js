const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/authRoutes');
const geminiRoutes = require('./routes/geminiRoutes');



// Routes
router.use('/auth', authRoutes);
router.use('/ai', geminiRoutes);



module.exports = router; 