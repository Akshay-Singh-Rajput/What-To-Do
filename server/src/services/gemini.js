const { GoogleGenerativeAI } = require("@google/generative-ai");
const { promptGenerator, history } = require("../helper/travelPromptGenerator");
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel(
    {
        model: "gemini-1.5-flash-latest",
        generationConfig: {
            "temperature": 1,
            "topP": 0.95,
            "topK": 64,
            "maxOutputTokens": 8192,
            "responseMimeType": "application/json"
        }
    });
// const chat = model.startChat();
let generationConfig = {
    "temperature": 1,
    "topP": 0.95,
    "topK": 64,
    "maxOutputTokens": 8192,
    "responseMimeType": "application/json"
};
const chatInstances = {};

const createChatInstance = (email) => {
    chatInstances[ email ] = model.startChat(
        {
            history: history
        }
    );
};

async function generateAiContent(email, prompt) {
    try {
        if (!chatInstances[ email ]) {
            createChatInstance(email);
        }
        const chat = chatInstances[ email ];
        const result = await chat.sendMessage(prompt);
        // const result2 = await model.generateContent(prompt);
        const history = chat._history;
        const response = await result.response;
        const text = await response.text();
        return { text, history };
    } catch (error) {
        console.error("Error generating AI content:", error);
        throw error;
    }
}

module.exports = { generateAiContent };
