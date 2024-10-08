import React, { useState, useEffect, useContext } from "react";
import LocationSearchBar from "../../app/components/LocationSearchBar";
import SelectableOptions from "../../app/components/SelectableOptions";
import PersonalizationOptions from "../../app/components/PersonalizationOptions";
import TripOptions from "../../app/components/TripOptions";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import { ThemeContext } from "@emotion/react";
import Page from "../../pages/suggestion/page";

export default function AdvanceActivityForm({ activityForm, handleActivitryForm, handleGenerateActivity }) {
    const apiKey = "AIzaSyD55Jf-yj3s7jUla7VnaVSU6HyH2doHBWs";
    const [ selectedActivityType, setSelectedActivityType ] = useState("Both");
    const [ selectedLikeOption, setSelectedLikeOption ] = useState(null);
    const [ selectedFeelingOption, setSelectedFeelingOption ] = useState(null);
    const [ prompt, setPrompt ] = useState("");
    const { theme } = useContext(ThemeContext);
    const [ payload, setPayload ] = useState({});
    const [ selectedLocation, setSelectedLocation ] = useState(null);
    const [ showRecommendation, setShowRecommendations ] = useState(false);

    const [ selectedBudget, setSelectedBudget ] = useState(null);
    const [ selectedCompanion, setSelectedCompanion ] = useState(null);
    const activityType = [
        { activity_type: "Both" },
        { activity_type: "Outdoor" },
        { activity_type: "Indoor" },
    ];

    const outdoorActivities = [
        "Hiking",
        "Picnicking",
        "Biking",
        "Camping",
        "Beach Day",
        "Sports",
        "Running/Jogging",
        "Fishing",
        "Kayaking/Canoeing",
        "Gardening",
    ];
    const indoorActivities = [
        "Board Games",
        "Cooking/Baking",
        "Movie Marathon",
        "Video Games",
        "Puzzle Solving",
        "DIY Crafts",
        "Book Club",
        "Karaoke",
        "Escape Room",
        "Trivia Night",
    ];
    const bothActivities = [
        ...indoorActivities,
        ...outdoorActivities
    ];
    const initialFeelingOptions = [ "Happy", "Relax", "Inspired", "Stressed" ];
    const initialPersonalizationOptions = [
        { label: "Distance", value: "5" },
        { label: "Gender", value: "All" },
        { label: "Age", value: "18-45" },
    ];

    const [ selectedPersonalization, setSelectedPersonalization ] = useState(initialPersonalizationOptions);
    const [ personalizationOptions, setPersonalizationOptions ] = useState(initialPersonalizationOptions);
    const [ feelingOptions, setFeelingOptions ] = useState(initialFeelingOptions);
    const [ selectedActivities, setSelectedActivities ] = useState(bothActivities);
    const [ likesOptions, setLikesOptions ] = useState(bothActivities);
    const [ selectedLikes, setSelectedLikes ] = useState([]);
    const [ selectedFeelings, setSelectedFeelings ] = useState([]);

    useEffect(() => {
        if (prompt) {
            setShowRecommendations(true);
        }
    }, [ prompt ]);

    const handlePlaceSelected = (place) => {
        console.log("Selected place:", place);
        setSelectedLocation(place);
    };

    const toggleActivityTab = (value) => {
        setSelectedActivityType(value);
        if (value === "Outdoor") {
            setSelectedActivities(outdoorActivities);
        } else if (value === "Indoor") {
            setSelectedActivities(indoorActivities);
        } else {
            setSelectedActivities(bothActivities);
        }
    };

    const handleAddLikeOption = (option) => {
        setLikesOptions((prev) => [ ...prev, option ]);
    };

    const handleAddFeelingOption = (option) => {
        setFeelingOptions((prev) => [ ...prev, option ]);
    };

    const handleSelect = ({ key, value }) => {
        const prevSelectedOptions = activityForm[ key ] || [];
        const updatedOptions = prevSelectedOptions.includes(value)
            ? prevSelectedOptions.filter(option => option !== value)
            : [ ...prevSelectedOptions, value ];

        handleActivitryForm({ key, value: updatedOptions });
        console.log({ value });
    };

    const handleSelectPersonalization = (option) => {
        setSelectedPersonalization((prev) => {
            const existingIndex = prev.findIndex((opt) => opt.label === option.label);
            if (existingIndex >= 0) {
                const newArray = [ ...prev ];
                newArray[ existingIndex ] = option;
                return newArray;
            } else {
                return [ ...prev, option ];
            }
        });
    };

    const createPrompt = (payload) => {
        const {
            selectedLikes,
            selectedFeelings,
            personalizationOptions,
            location,
            budget,
            companion,
        } = payload;

        const likesText =
            selectedLikes.length > 0 ? selectedLikes.join(", ") : "no specific likes";
        const feelingsText =
            selectedFeelings.length > 0
                ? selectedFeelings.join(", ")
                : "no particular feelings";

        const optionsText = personalizationOptions
            .map((option) => `${option.label}: ${option.value}`)
            .join(", ");

        const locationText = location ? `near ${location}` : "anywhere";
        const budgetText = budget ? budget.label : "any budget";
        const companionText = companion ? companion.label : "no companion preference";

        return `Hey, I am looking for recommendations for activities that match the following details: 
      - Likes: ${likesText}
      - Feelings: ${feelingsText}
      - Personalization options: ${optionsText}
      - Location: ${locationText}
      - Budget: ${budgetText}
      - Companion: ${companionText}
      Can you suggest some options?`;
    };

    const handleSearch = () => {
        const newPayload = {
            selectedLikes,
            selectedFeelings,
            personalizationOptions: selectedPersonalization,
            location: selectedLocation?.formatted_address,
            budget: selectedBudget,
            companion: selectedCompanion,
        };
        setPayload(newPayload);
        const newPrompt = createPrompt(newPayload);
        setPrompt(newPrompt);
        console.log(newPrompt);
    };

    return (
        <>
            { showRecommendation ? (
                <Page prompt={ prompt } cb={ setShowRecommendations } />
            ) : (
                <div className="min-h-screen m-auto flex flex-col gap-4 w-[90%] font-semibold tr04">
                    <div className="text-3xl pt-5">Explore</div>
                    <div className="mb-2">
                        <LocationSearchBar
                            apiKey={ apiKey }
                            onPlaceSelected={ (place) => handleActivitryForm({ key: 'location', value: place.formatted_address }) }
                        />
                    </div>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="text-lg leading-5">I'm interested in</div>
                        <div
                            className={ `flex items-center justify-between rounded-full p-1 ${theme === "dark" ? "bg-gray-800" : "bg-gray-400"
                                }` }
                        >
                            { activityType.map((activity, idx) => (
                                <div
                                    key={ idx }
                                    className={ `flex-1 text-center py-2 rounded-full cursor-pointer transition-colors duration-200 ${activityForm?.interests === activity?.activity_type
                                        ? `${theme === "dark"
                                            ? "bg-gray-700 text-white"
                                            : "bg-white text-black"
                                        } font-bold`
                                        : `${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                        }`
                                        }` }
                                    onClick={ () => handleActivitryForm({ key: "interests", value: activity?.activity_type }) }
                                >
                                    { activity?.activity_type }
                                </div>
                            )) }
                        </div>
                    </div>
                    <div>
                        <div className="text-lg leading-9">What do you like ?</div>

                        <SelectableOptions
                            selectedOptions={ activityForm.activities }
                            options={ likesOptions }
                            onAdd={ handleAddLikeOption }
                            onSelect={ (value) => handleSelect({ key: 'activities', value }) }
                            activityForm={ activityForm }
                        />
                    </div>
                    <div>
                        <div className="text-xl font-base leading-5">  How is your mood today?</div>
                        <SelectableOptions
                            selectedOptions={ activityForm.feelings }
                            options={ feelingOptions }
                            onAdd={ handleAddFeelingOption }
                            onSelect={ (value) => handleSelect({ key: 'feelings', value }) }
                        />
                    </div>
                    <TripOptions
                        activityForm={ activityForm }
                        handleActivitryForm={ handleActivitryForm }
                    />
                    {/* <PersonalizationOptions
                        options={ personalizationOptions }
                        onAdd={ handleAddLikeOption }
                        onSelect={ handleSelectPersonalization }
                    /> */}

                    <Box
                        sx={ {
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 4,
                            marginBottom: 3,
                        } }
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            className="w-full"
                            onClick={ handleGenerateActivity }
                        >
                            Find Your Ideal Activities
                        </Button>
                    </Box>

                </div>
            ) }
        </>
    );
}
