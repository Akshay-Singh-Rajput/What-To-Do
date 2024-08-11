const express = require('express');
const { generateAiContent } = require('../services/gemini');
const { promptGenerator } = require('../helper/travelPromptGenerator');
const User = require('../models/userModel');

async function addActivitiesByEmail(email, newActivities) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        user.activities.push(...newActivities);

        const updatedUser = await user.save();

        return updatedUser;
    } catch (error) {
        console.error('Error adding activities:', error);
        throw error;
    }
}
const getSuggestions = async (req, res) => {
    let { payload } = req.body;
    const { email } = req.user;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    if (!payload) {
        return res.status(400).json({ message: 'Please provide the details of the activities.' });
    }

    if(!payload.location){
        payload.location = "India"
    }

    const payload2 = {
        location: "Delhi",
        nDays: 1,
        nHrs: 2,
        nPeople: "Friends",
        budget: "Moderate",
        radius: 50,
        activities: [ "Hiking", "Cooking/Baking" ],
        feelings: [ "Happy", "Inspired" ],
        gender: "All",
        ageRange: "18-30",
        interests: "Outdoor"
    };

    let prompt = promptGenerator(payload);

    try {
        const { jsonData, history, response } = await generateAiContent(email, prompt);
        const activities = {
            prompt: prompt,
            payload: payload,
            data: jsonData
        };
        user.activities.push(activities);
        await user.save();
        res.status(200).json({ content: jsonData });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error: 'Failed to generate AI content' });
    }
};

module.exports = { getSuggestions };

