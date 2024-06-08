const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateAiContent(prompt) {
    try {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // history: [
        //     {
        //         role: "user",
        //         parts: [ { text: "Hello, I have 2 dogs in my house." } ],
        //     },
        //     {
        //         role: "model",
        //         parts: [ { text: "Great to meet you. What would you like to know?" } ],
        //     },
        // ],

        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(prompt);


        // const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log({ response }, response.candidates)
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error generating AI content:", error);
        throw error;
    }
}

module.exports = { generateAiContent };
