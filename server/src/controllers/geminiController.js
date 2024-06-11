const express = require('express');
const { generateAiContent } = require('../services/gemini');

const getSuggestions = async (req, res) => {
    const { prompt } = req.body;

    try {

        let text = `To give you the best recommendations for your weekend in Delhi, I need a little more information! Tell me:

**1. What are your interests?** 
* Do you prefer history and culture, food and nightlife, nature and relaxation, shopping, or something else?
* Are you interested in museums, temples, parks, markets, or something specific?

**2. What is your budget?** 
* Are you looking for luxurious experiences, budget-friendly options, or something in between?

**3. How much time do you have?** 
* Are you in Delhi for a full weekend (Saturday and Sunday), or just one day?

**4. Are you traveling alone, with friends, or with family?**

Once you tell me more about your preferences, I can create a personalized itinerary for your Delhi weekend! 😊 
`;
        // return res.status(200).json({ content: text });

        const content = await generateAiContent(req.user.email,prompt);
        res.status(200).json({ content });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate AI content' });
    }
};

module.exports = { getSuggestions };
