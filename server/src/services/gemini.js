const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
// const chat = model.startChat();

const chatInstances = {};

const createChatInstance = (email) => {
    chatInstances[ email ] = model.startChat();
};

async function generateAiContent(email, prompt) {
    try {
        if (!chatInstances[ email ]) {
            createChatInstance(email);
        }
        const chat = chatInstances[ email ];
        // const result = await chat.sendMessage(prompt);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error generating AI content:", error);
        throw error;
    }
}

module.exports = { generateAiContent };
