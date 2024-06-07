const express = require('express');
const { generateAiContent } = require('../services/gemini');

const getSuggestions = async (req, res) => {
    const { prompt } = req.body;

    try {
        const content = await generateAiContent(prompt);
        res.status(200).json({ content });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate AI content' });
    }
};

module.exports = { getSuggestions };
