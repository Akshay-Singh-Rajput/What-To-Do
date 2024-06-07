const express = require('express');
const { getSuggestions } = require('../controllers/geminiController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/suggestions', authMiddleware, getSuggestions);

module.exports = router;
