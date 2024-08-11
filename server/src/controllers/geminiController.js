const express = require('express');
const { generateAiContent } = require('../services/gemini');
const { createPrompt } = require('../helper/travelPromptGenerator');

// const createPrompt = (payload) => {
//     const { location, nDays, nPeople, budget, radius, } = payload;
//     let budgetEnum = [ 'Cheap', "Moderate", "Luxury" ];
//     let interestedIn = [ 'Both', 'outdoor', 'indoor' ];
//     let nPeopleEnum = [ "Just me", "A couple", "Family", "Friends" ];
//     const activityType = [
//         { activity_type: "Both" },
//         { activity_type: "Outdoor" },
//         { activity_type: "Indoor" },
//     ];

//     const outdoorActivities = [
//         "Hiking",
//         "Picnicking",
//         "Biking",
//         "Camping",
//         "Beach Day",
//         "Sports",
//         "Running/Jogging",
//         "Fishing",
//         "Kayaking/Canoeing",
//         "Gardening",
//     ];
//     const indoorActivities = [
//         "Board Games",
//         "Cooking/Baking",
//         "Movie Marathon",
//         "Video Games",
//         "Puzzle Solving",
//         "DIY Crafts",
//         "Book Club",
//         "Karaoke",
//         "Escape Room",
//         "Trivia Night",
//     ];
//     const bothActivities = [
//         ...indoorActivities,
//         ...outdoorActivities
//     ];

//     const initialFeelingOptions = [ "Happy", "Relax", "Inspired", "Stressed" ];


//     const initialPersonalizationOptions = [
//         { label: "Distance", value: "5" },
//         { label: "Gender", value: "All" },
//         { label: "Age", value: "18-45" },
//     ];


//     let prompt = `"Generate Travel Plan for Location : ${location} with radius of ${radius} kms, for ${nDays} Days for ${nPeople} with a ${budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing as per location currency, Time travel each of the location for 1 days with each day plan with best time to visit in JSON format."`;
// };

const getSuggestions = async (req, res) => {
    let { prompt } = req.body;


    const payload2 = {
        location: "Paris",
        nDays: 5,
        nPeople: "Family",
        budget: "Moderate",
        radius: 50,
        activities: [ "Hiking", "Cooking/Baking" ],
        feelings: [ "Happy", "Inspired" ],
        gender: "All",
        ageRange: "18-45",
        interests: [ "Outdoor", "Indoor" ],
        travelPreferences: {
            transportMode: "Public Transport",
            preferredTime: "Morning"
        }
    };

    prompt = createPrompt(prompt);

    try {
        const { text, history } = await generateAiContent(req.user.email, prompt);
        res.status(200).json({ content: text, history });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate AI content' });
    }
};

module.exports = { getSuggestions };

