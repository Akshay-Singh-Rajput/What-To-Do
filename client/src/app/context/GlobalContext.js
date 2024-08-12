import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const GlobalContext = createContext();

let activities = [
    {
        "activity_name": "Visit the Kingdom of Dreams",
        "activity_image": "https://cdn.dribbble.com/userupload/4391227/file/original-3bd9433655e67aabe8fd2c65821250b5.png?resize=400x0",
        "activity_description": "Experience a vibrant cultural extravaganza at the Kingdom of Dreams, featuring live performances, musicals, and a taste of Indian heritage.",
        "pricing": "₹500 - ₹1,500 per person",
        "geo_coordinates": "28.4595° N, 77.0266° E",
        "place_address": "Sector 29, Gurugram, Haryana 122001",
        "location": "Gurugram, Haryana, India"
    },
    {
        "activity_name": "Explore the Kingdom of Dreams",
        "activity_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.holidify.com%2Fpages%2Fkingdom-of-dreams-gurugram-a-cultural-extravaganza-1096.html&psig=AOvVaw27F-8l9j0N5o3zD2gO6z1J&ust=1701418749792000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPCm7M3b-4oCFQAAAAAdAAAAABAD",
        "activity_description": "Immerse yourself in a vibrant cultural experience at Kingdom of Dreams, a unique entertainment destination featuring live shows, interactive exhibits, and traditional Indian cuisine.",
        "pricing": "INR 500 - 1000",
        "geo_coordinates": "28.4690° N, 77.0735° E",
        "place_address": "Sector 29, Gurugram, Haryana 122001",
        "location": "Gurugram"
    },
    {
        "activity_name": "Visit the Cyber Hub",
        "activity_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.holidify.com%2Fpages%2Fcyber-hub-gurugram-a-must-visit-destination-1100.html&psig=AOvVaw3oW3N7F3t0s2l5-xM0Y2rZ&ust=1701418749797000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOCy6N3b-4oCFQAAAAAdAAAAABAD",
        "activity_description": "Enjoy a lively atmosphere at Cyber Hub, a popular hub for dining, shopping, and entertainment. Discover trendy cafes, international restaurants, and upscale boutiques.",
        "pricing": "Varies",
        "geo_coordinates": "28.4713° N, 77.0781° E",
        "place_address": "Cyber Hub, DLF Cyber City, Gurugram, Haryana 122002",
        "location": "Gurugram"
    },
    {
        "activity_name": "Explore the Heritage Transport Museum",
        "activity_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.holidify.com%2Fpages%2Fheritage-transport-museum-gurugram-a-journey-through-time-1097.html&psig=AOvVaw1gO1X_q9q-3lX4rY5kZ-2&ust=1701418749801000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJ-n5N3b-4oCFQAAAAAdAAAAABAD",
        "activity_description": "Step back in time at the Heritage Transport Museum, showcasing a fascinating collection of vintage cars, motorcycles, and other vehicles from across the globe.",
        "pricing": "INR 300 - 500",
        "geo_coordinates": "28.4732° N, 77.0688° E",
        "place_address": "Tau Devi Lal Biodiversity Park, Sector 57, Gurugram, Haryana 122002",
        "location": "Gurugram"
    },
    {
        "activity_name": "Visit the Aravalli Biodiversity Park",
        "activity_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.holidify.com%2Fpages%2Faravalli-biodiversity-park-gurugram-a-breath-of-fresh-air-1102.html&psig=AOvVaw3y1u44Qp8zH-m73a8uV3X&ust=1701418749805000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOC05N3b-4oCFQAAAAAdAAAAABAD",
        "activity_description": "Escape the urban bustle at the Aravalli Biodiversity Park, a tranquil green space offering scenic trails, a lake, and a variety of flora and fauna.",
        "pricing": "Free",
        "geo_coordinates": "28.4824° N, 77.0583° E",
        "place_address": "Sector 57, Gurugram, Haryana 122002",
        "location": "Gurugram"
    },
    {
        "activity_name": "Experience a Cooking Class",
        "activity_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.holidify.com%2Fpages%2Fcooking-classes-in-gurugram-a-delicious-experience-1103.html&psig=AOvVaw26Qk4g_H6W6M8q0y77-dM&ust=1701418749809000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLjI5N3b-4oCFQAAAAAdAAAAABAD",
        "activity_description": "Learn the art of Indian cooking at a local cooking class. Discover traditional recipes, techniques, and flavors, and create your own culinary masterpiece.",
        "pricing": "INR 1000 - 2000",
        "geo_coordinates": "28.4690° N, 77.0735° E",
        "place_address": "Various locations in Gurugram",
        "location": "Gurugram"
    },
    {
        "activity_name": "Shop at the DLF Emporio",
        "activity_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.holidify.com%2Fpages%2Fshopping-in-gurugram-a-shopaholics-paradise-1099.html&psig=AOvVaw2u-T_Q7-e08n5o9y6tD7C&ust=1701418749813000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOCb5N3b-4oCFQAAAAAdAAAAABAD",
        "activity_description": "Indulge in a luxurious shopping experience at DLF Emporio, a high-end mall featuring designer boutiques, international brands, and gourmet food outlets.",
        "pricing": "Varies",
        "geo_coordinates": "28.4675° N, 77.0779° E",
        "place_address": "DLF Phase IV, Gurugram, Haryana 122002",
        "location": "Gurugram"
    },
    {
        "activity_name": "Visit the Leisure Valley Park",
        "activity_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.holidify.com%2Fpages%2Fleisure-valley-park-gurugram-a-perfect-weekend-getaway-1101.html&psig=AOvVaw12V3k86l442-u4I3b265M&ust=1701418749817000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCNDx5N3b-4oCFQAAAAAdAAAAABAD",
        "activity_description": "Enjoy a relaxing stroll or picnic at Leisure Valley Park, a sprawling green space with a lake, amphitheater, and various recreational facilities.",
        "pricing": "Free",
        "geo_coordinates": "28.4575° N, 77.0787° E",
        "place_address": "Sector 29, Gurugram, Haryana 122001",
        "location": "Gurugram"
    },
    {
        "activity_name": "Experience the Divine at the ISKCON Temple",
        "activity_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iskcon.org%2Ftemples%2Fiskcon-temple-gurugram%2F&psig=AOvVaw06oY30Y_xY_f8v8Z8VjS&ust=1701418749821000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCN7O5N3b-4oCFQAAAAAdAAAAABAD",
        "activity_description": "Find inner peace at the ISKCON Temple, a serene and beautiful place of worship dedicated to Lord Krishna, offering spiritual guidance and cultural events.",
        "pricing": "Free",
        "geo_coordinates": "28.4770° N, 77.0759° E",
        "place_address": "Sector 47, Gurugram, Haryana 122002",
        "location": "Gurugram"
    },
    {
        "activity_name": "Visit the Sultanpur Bird Sanctuary",
        "activity_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.holidify.com%2Fpages%2Fsultanpur-bird-sanctuary-gurugram-a-birdwatchers-paradise-1104.html&psig=AOvVaw3tR7W922_W7i7X4h5gV9B&ust=1701418749825000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCNjr5N3b-4oCFQAAAAAdAAAAABAD",
        "activity_description": "Embark on a nature adventure at the Sultanpur Bird Sanctuary, home to a diverse range of migratory birds, offering a tranquil escape from the city.",
        "pricing": "INR 50 - 100",
        "geo_coordinates": "28.4381° N, 77.1243° E",
        "place_address": "Sultanpur, Gurugram, Haryana 122001",
        "location": "Gurugram"
    }

];

export const GlobalProvider = ({ children }) => {
    const { user, setUser } = useAuth();
    const [ isBottomSheetOpen, setIsBottomSheetOpen ] = useState(false);
    const [ currentActivities, setCurrentActivities ] = useState([]);
    const [ previousActivities, setPreviousActivities ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [skeletonLoading, setSkeletonLoading] = useState(false);


    const getUserProfile = () => {
        axios.get('/user/profile',
            {
                headers: {
                    accepts: "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        ).then(response => {
            let data = response?.data || {};
            setUser(data);
            setPreviousActivities(data?.user?.activities || []);
        }).catch(error => {

        });
    };


    return (
        <GlobalContext.Provider value={
            {
                getUserProfile,
                currentActivities, setCurrentActivities,
                previousActivities, setPreviousActivities,
                isBottomSheetOpen, setIsBottomSheetOpen,
                isLoading, setIsLoading,
                skeletonLoading, setSkeletonLoading
            } }>
            { children }
        </GlobalContext.Provider>
    );
};


export const useGlobalContext = () => {
    return useContext(GlobalContext);
};