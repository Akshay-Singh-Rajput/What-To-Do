const createPrompt = (payload) => {
    const {
        location,
        nDays,
        nPeople,
        budget,
        radius,
        activities,
        feelings,
        gender,
        ageRange,
        interests,
        travelPreferences
    } = payload;

    // Define possible values
    const budgetEnum = [ 'Cheap', 'Moderate', 'Luxury' ];
    const nPeopleEnum = [ "Just me", "A couple", "Family", "Friends" ];
    const initialFeelingOptions = [ "Happy", "Relax", "Inspired", "Stressed" ];
    const activityType = {
        Both: [ "Hiking", "Picnicking", "Biking", "Camping", "Beach Day", "Sports", "Running/Jogging", "Fishing", "Kayaking/Canoeing", "Gardening", "Board Games", "Cooking/Baking", "Movie Marathon", "Video Games", "Puzzle Solving", "DIY Crafts", "Book Club", "Karaoke", "Escape Room", "Trivia Night" ],
        Outdoor: [ "Hiking", "Picnicking", "Biking", "Camping", "Beach Day", "Sports", "Running/Jogging", "Fishing", "Kayaking/Canoeing", "Gardening" ],
        Indoor: [ "Board Games", "Cooking/Baking", "Movie Marathon", "Video Games", "Puzzle Solving", "DIY Crafts", "Book Club", "Karaoke", "Escape Room", "Trivia Night" ]
    };

    // Helper function to format the activities list
    const formatActivities = (activities) => {
        if (!activities || activities.length === 0) return '';
        return `Activities of interest: ${activities.join(', ')}.`;
    };

    // Helper function to format interests
    const formatInterests = (interests) => {
        if (!interests || interests.length === 0) return '';
        return `Interested in: ${interests.join(', ')}.`;
    };

    // Constructing the prompt based on available data
    let prompt = `Generate Travel Plan`;

    if (location) {
        prompt += ` for Location: ${location}`;
    }

    if (radius) {
        prompt += ` with a radius of ${radius} kms`;
    }

    if (nDays) {
        prompt += ` for ${nDays} Days`;
    }

    if (nPeople && nPeopleEnum.includes(nPeople)) {
        prompt += ` for ${nPeople}`;
    }

    if (budget && budgetEnum.includes(budget)) {
        prompt += ` with a ${budget} budget`;
    }

    prompt += `, give me Hotels options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions`;

    if (activities && activities.length > 0) {
        prompt += ` and suggest itinerary with placeName, Place Details, Place Image URL, Geo Coordinates, Place address, ticket Pricing as per location currency.`;
        prompt += ` Focus on the following activities: ${formatActivities(activities)}`;
    }

    if (feelings && feelings.length > 0) {
        prompt += ` Ensure the travel plan matches the following feelings: ${feelings.join(', ')}.`;
    }

    if (gender) {
        prompt += ` Tailor the suggestions based on gender preference: ${gender}.`;
    }

    if (ageRange) {
        prompt += ` Adjust recommendations according to age range: ${ageRange}.`;
    }

    if (interests && interests.length > 0) {
        prompt += ` Include activities for the following interests: ${formatInterests(interests)}.`;
    }

    if (travelPreferences) {
        if (travelPreferences.transportMode) {
            prompt += ` Prefer ${travelPreferences.transportMode} for transport.`;
        }
        if (travelPreferences.preferredTime) {
            prompt += ` Prefer visiting locations in the ${travelPreferences.preferredTime}.`;
        }
    }

    prompt += ` Time travel each of the locations for 1 day with a detailed plan for each day, including the best time to visit in JSON format.`;

    return prompt;
};






 
 const promptGenerator = () => {
    let str = `Generate Travel Plan for Location : Delhi, India, for 1 Days for 1 with a Cheap budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing, Time travel each of the location for 1 days with each day plan with best time to visit in JSON format.`;

    let str2 = `Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.`;

    let userPrompt = {
        "role": "user",
        "parts": [
            {
                "text": str
            }
        ]
    };

    chatPrompt.push(userPrompt);

    return chatPrompt;
};




let history = [
    {
        "role": "user",
        "parts": [
            {
                "text": "Generate Travel Plan for Location : Delhi, India, for 1 Days for 1 with a Cheap budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing, Time travel each of the location for 1 days with each day plan with best time to visit in JSON format."
            }
        ]
    },
    {
        "parts": [
            {
                "text": "```json\n{\n  \"trip\": {\n    \"location\": \"Delhi, India\",\n    \"duration\": \"1 Day\",\n    \"budget\": \"Cheap\",\n    \"traveler\": 1,\n    \"hotels\": [\n      {\n        \"name\": \"The Backpackers Hostel\",\n        \"address\": \"1819/1, 2nd Floor, Above Bata Showroom, Paharganj, New Delhi, Delhi 110055\",\n        \"price\": \"$10 - $20 per night\",\n        \"imageUrl\": \"https://www.hostelworld.com/hostelphotos/17146/large/The-Backpackers-Hostel-New-Delhi-India-Exterior-View.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 28.6447,\n          \"longitude\": 77.2178\n        },\n        \"rating\": 4.5,\n        \"description\": \"A budget-friendly hostel in the heart of Paharganj, known for its social atmosphere and proximity to the railway station.\"\n      },\n      {\n        \"name\": \"Zostel Delhi\",\n        \"address\": \"28, M.G. Road, Opposite PVR Priya Cinema, Connaught Place, New Delhi, Delhi 110001\",\n        \"price\": \"$15 - $30 per night\",\n        \"imageUrl\": \"https://www.zostel.com/wp-content/uploads/2016/07/zostel-delhi-exterior-shot.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 28.6328,\n          \"longitude\": 77.2198\n        },\n        \"rating\": 4.2,\n        \"description\": \"A stylish and modern hostel in Connaught Place, offering a mix of private rooms and dorms, along with common areas for socializing.\"\n      },\n      {\n        \"name\": \"The Attic\",\n        \"address\": \"1st Floor, 346, 1st Floor, Main Market, Lajpat Nagar II, New Delhi, Delhi 110024\",\n        \"price\": \"$12 - $25 per night\",\n        \"imageUrl\": \"https://www.hostelworld.com/hostelphotos/156120/large/The-Attic-New-Delhi-India-The-Attic-hostel.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 28.5724,\n          \"longitude\": 77.2429\n        },\n        \"rating\": 4.0,\n        \"description\": \"A cozy and clean hostel in Lajpat Nagar, offering comfortable accommodations and a friendly atmosphere.\"\n      }\n    ],\n    \"itinerary\": [\n      {\n        \"day\": 1,\n        \"plan\": [\n          {\n            \"time\": \"8:00 AM - 10:00 AM\",\n            \"placeName\": \"Red Fort\",\n            \"placeDetails\": \"A UNESCO World Heritage Site, the Red Fort is a magnificent Mughal-era fort with impressive architecture and historical significance.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Red_Fort_Delhi.jpg/1200px-Red_Fort_Delhi.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 28.6560,\n              \"longitude\": 77.2399\n            },\n            \"placeAddress\": \"Netaji Subhas Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi 110006\",\n            \"ticketPricing\": \"INR 10 for Indians, INR 250 for foreigners\",\n            \"timeTravel\": \"30 minutes\"\n          },\n          {\n            \"time\": \"10:30 AM - 12:00 PM\",\n            \"placeName\": \"Jama Masjid\",\n            \"placeDetails\": \"The largest mosque in India, Jama Masjid is an architectural marvel and a significant place of worship.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Jama_Masjid_Delhi.jpg/1200px-Jama_Masjid_Delhi.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 28.6492,\n              \"longitude\": 77.2345\n            },\n            \"placeAddress\": \"Mehrauli Rd, Jama Masjid, Chandni Chowk, New Delhi, Delhi 110006\",\n            \"ticketPricing\": \"Free\",\n            \"timeTravel\": \"15 minutes\"\n          },\n          {\n            \"time\": \"12:30 PM - 2:00 PM\",\n            \"placeName\": \"Chandni Chowk\",\n            \"placeDetails\": \"A bustling market street known for its street food, shops, and historical charm.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Chandni_Chowk_Delhi.jpg/1200px-Chandni Chowk_Delhi.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 28.6505,\n              \"longitude\": 77.2304\n            },\n            \"placeAddress\": \"Chandni Chowk, New Delhi, Delhi 110006\",\n            \"ticketPricing\": \"N/A\",\n            \"timeTravel\": \"5 minutes\"\n          },\n          {\n            \"time\": \"2:00 PM - 3:00 PM\",\n            \"placeName\": \"Lunch at Paranthe Wali Gali\",\n            \"placeDetails\": \"Famous for its delicious parathas (stuffed flatbreads), this narrow alley is a must-visit for food lovers.\",\n            \"placeImageUrl\": \"https://www.holidify.com/images/cmsuploads/2018/10/paratha-wali-gali-delhi-1539682342.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 28.6502,\n              \"longitude\": 77.2307\n            },\n            \"placeAddress\": \"Paranthe Wali Gali, Chandni Chowk, New Delhi, Delhi 110006\",\n            \"ticketPricing\": \"N/A\",\n            \"timeTravel\": \"N/A\"\n          },\n          {\n            \"time\": \"3:30 PM - 5:00 PM\",\n            \"placeName\": \"Humayun's Tomb\",\n            \"placeDetails\": \"A beautiful Mughal-era tomb with intricate architecture and serene gardens, a UNESCO World Heritage Site.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Humayuns_Tomb_Delhi_India.jpg/1200px-Humayuns_Tomb_Delhi_India.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 28.6129,\n              \"longitude\": 77.2307\n            },\n            \"placeAddress\": \"Mathura Road, Nizamuddin, New Delhi, Delhi 110013\",\n            \"ticketPricing\": \"INR 30 for Indians, INR 500 for foreigners\",\n            \"timeTravel\": \"45 minutes\"\n          },\n          {\n            \"time\": \"5:30 PM - 6:30 PM\",\n            \"placeName\": \"Dinner at Karim's\",\n            \"placeDetails\": \"A legendary restaurant known for its delicious Mughlai cuisine.\",\n            \"placeImageUrl\": \"https://media-cdn.tripadvisor.com/media/photo-s/0f/d3/2a/8e/karims-restaurant.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 28.6497,\n              \"longitude\": 77.2339\n            },\n            \"placeAddress\": \"16, Gali Kababian, Jama Masjid, Chandni Chowk, New Delhi, Delhi 110006\",\n            \"ticketPricing\": \"N/A\",\n            \"timeTravel\": \"15 minutes\"\n          },\n          {\n            \"time\": \"7:00 PM - 8:00 PM\",\n            \"placeName\": \"Evening stroll in Connaught Place\",\n            \"placeDetails\": \"A vibrant commercial and entertainment hub with shops, restaurants, and outdoor spaces.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Connaught_Place_Delhi.jpg/1200px-Connaught_Place_Delhi.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 28.6328,\n              \"longitude\": 77.2198\n            },\n            \"placeAddress\": \"Connaught Place, New Delhi, Delhi 110001\",\n            \"ticketPricing\": \"N/A\",\n            \"timeTravel\": \"30 minutes\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary is just a suggestion and can be customized based on your interests and preferences.\n* The prices for hotels and attractions are approximate and can vary depending on the season and availability.\n* It is recommended to book accommodation and tickets in advance, especially during peak season.\n* Remember to carry a map or use a GPS app to navigate around the city.\n* Be aware of your surroundings and take precautions against pickpocketing, especially in crowded areas.\n* Enjoy your trip to Delhi!\n"
            }
        ],
        "role": "model"
    }
];


console.log(history);
module.exports = { promptGenerator, history, createPrompt };
