const { GoogleGenerativeAI } = require("@google/generative-ai");
const { promptGenerator, history } = require("../helper/travelPromptGenerator");
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    generationConfig: {
        "temperature": 1,
        "topP": 0.95,
        "topK": 64,
        "maxOutputTokens": 8192,
        "responseMimeType": "application/json"
    }
});

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
    //     {
    //     history: history
    // }
);
};

async function generateAiContent(email, prompt) {
    try {
        if (!chatInstances[ email ]) {
            createChatInstance(email);
        }
        const chat = chatInstances[ email ];

        // Adding the system instruction to the prompt
        const systemPrompt = `You are a model that strictly outputs a list of 10 object. Each object must contain the following key names and values: "activity_name", "activity_image", "activity_description", "pricing", "geo_coordinates", "place_address", and "location". The "activity_image" must be a valid image URL sourced from a Google Images search. Do not include any additional text or keys. The output should only be the list of objects in the specified format.`;

        const combinedPrompt = `${systemPrompt}\n\n${prompt}`;

        const result = await chat.sendMessage(combinedPrompt);
        const history = chat._history;
        const response = await result.response;
        const text = await response.text();
        let parsedText = JSON.parse(text)
        return { text: parsedText, history, response };
    } catch (error) {
        console.error("Error generating AI content:", error);
        throw error;
    }
}

module.exports = { generateAiContent };
