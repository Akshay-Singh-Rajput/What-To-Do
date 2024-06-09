import React from 'react';
import { Container, Typography, Button, Box, useTheme } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const { themeMode } = useThemeContext();

    const textColor = theme.palette.text.primary;
    const isDarkMode = themeMode === 'dark';

    const introTextColor = isDarkMode ? 'text-white' : 'text-black';
    const introBackgroundColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';

    return (
        <Container maxWidth="lg" className={ `${introBackgroundColor}` }>
            <div className={ `min-h-screen flex flex-col items-center justify-center ${introBackgroundColor}` }>
                <Typography variant="h2" component="h1" gutterBottom className={ introTextColor }>
                    Welcome { user?.displayName } to WhatToDo!
                </Typography>
                <Typography variant="h5" gutterBottom sx={ { color: textColor } } className='text-center'>
                    Discover your perfect plan with WhatToDo! Personalized activities tailored to your mood, budget, location, group, age, and more. Start exploring now!
                </Typography>
                <Link href="/suggestion/page" className='mt-2'>
                    <Button variant="contained" color="primary">
                        Explore Now
                    </Button>
                </Link>
            </div>
            <Box my={ 6 } className={ introTextColor }>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Key Features
                </Typography>
                <div className="flex flex-wrap justify-around items-center">
                    <FeatureCard title="Personalized Recommendations" description="Get tailored suggestions based on your preferences and context." icon="🎉" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                    <FeatureCard title="Explore Nearby Activities" description="Discover exciting activities and events happening near you." icon="🌍" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                    <FeatureCard title="Group Planning Made Easy" description="Coordinate outings with friends or family effortlessly." icon="👨‍👩‍👦" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                </div>
            </Box>
            <Box my={ 6 } className={ introTextColor }>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    User Profile
                </Typography>
                <div className="flex flex-wrap justify-around items-center">
                    <FeatureCard title="Basic Information" description="Provide your age, gender, location, and optional contact information." icon="👤" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                    <FeatureCard title="Interests and Hobbies" description="Share your preferences for outdoor activities, indoor activities, cultural interests, entertainment, sports, and food." icon="❤️" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                </div>
            </Box>
            <Box my={ 6 } className={ introTextColor }>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Event Preferences
                </Typography>
                <div className="flex flex-wrap justify-around items-center">
                    <FeatureCard title="Activity Type" description="Select the type of activities you're interested in, such as social, solo, family-friendly, or pet-friendly." icon="📅" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                    <FeatureCard title="Time and Duration" description="Specify your available time slots and preferred activity durations." icon="⏰" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                    <FeatureCard title="Budget" description="Indicate your budget preferences for activities, whether low, medium, or high." icon="💰" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                    <FeatureCard title="Travel Distance" description="Choose the distance you're willing to travel for activities, from nearby to outskirts." icon="🚗" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                    <FeatureCard title="Group Details" description="Specify the number of people, age group, and any special requirements for group activities." icon="👥" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                </div>
            </Box>
            <Box my={ 6 } className={ introTextColor }>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Contextual Information
                </Typography>
                <div className="flex flex-wrap justify-around items-center">
                    <FeatureCard title="Current Mood" description="Select your mood to receive recommendations that match your current vibe." icon="😊" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                    <FeatureCard title="Weather Preferences" description="Indicate your preferences for indoor or outdoor activities and any weather sensitivities." icon="☀️" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                </div>
            </Box>
            <Box my={ 6 } className={ introTextColor }>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Feedback and History
                </Typography>
                <div className="flex flex-wrap justify-around items-center">
                    <FeatureCard title="Previous Activities" description="View your past activities, including liked, disliked, and wish-listed activities." icon="📚" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                    <FeatureCard title="Post-Activity Feedback" description="Rate your experiences and provide detailed reviews to improve future recommendations." icon="🌟" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                </div>
            </Box>
            <Box my={ 6 } className={ introTextColor }>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Implementation Strategy
                </Typography>
                <div className="flex flex-wrap justify-around items-center">
                    <FeatureCard title="Adaptive Questionnaires" description="Use dynamic forms to gather user preferences and refine suggestions over time." icon="🔄" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                    <FeatureCard title="AI-Driven Suggestions" description="Leverage AI algorithms to analyze user input and offer personalized recommendations." icon="🤖" textColor={ themeMode === 'dark' ? 'white' : 'black' } />
                </div>
            </Box>
        </Container>
    );
};

const FeatureCard = ({ title, description, icon, textColor }) => {
    const backgroundColor = textColor === 'text-white' ? 'bg-gray-900' : 'bg-white';
    const cardTextColor = textColor === 'text-white' ? 'text-white' : 'text-black';

    return (
        <div className={ `p-6 m-4 border rounded-md shadow-lg max-w-sm ${backgroundColor}` }>
            <Typography variant="h6" gutterBottom className={ cardTextColor }>
                { icon } { title }
            </Typography>
            <Typography variant="body2" color="textSecondary" className={ cardTextColor }>
                { description }
            </Typography>
        </div>
    );
};


export default LandingPage;
