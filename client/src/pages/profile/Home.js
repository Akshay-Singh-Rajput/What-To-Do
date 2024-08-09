import React, { useState, useEffect } from "react";
import LocationSearchBar from "../../app/components/LocationSearchBar";
import SelectableOptions from "../../app/components/SelectableOptions";
import PersonalizationOptions from "../../app/components/PersonalizationOptions";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import Page from "../suggestion/page";
import { useContext } from 'react';
import { ThemeContext } from "@emotion/react"; 

export default function Home() {
  const apiKey = "AIzaSyD55Jf-yj3s7jUla7VnaVSU6HyH2doHBWs"; // Gemini Api key
  const [selectedActivityType, setSelectedActivityType] = useState("Both");
  const [selectedLikeOption, setSelectedLikeOption] = useState(null);
  const [selectedFeelingOption, setSelectedFeelingOption] = useState(null);
  const [prompt, setPrompt] = useState("");
  const initialPersonalizationOptions = [
    { label: "Distance", value: "5" },
    { label: "Gender", value: "All" },
    { label: "Age", value: "18-45" },
  ];
  const [selectedLikes, setSelectedLikes] = useState([]);
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const { theme } = useContext(ThemeContext); 
  const [payload, setPayload] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showRecommendation, setShowRecommendations] = useState(false);

  const [activityType, setActivityType] = useState([
    {
      activity_type: "Both",
      activity_img:
        "https://images.unsplash.com/photo-1607537826539-0eb279b56804?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG91dGRvb3IlMjBhY3Rpdml0aWVzfGVufDB8fDB8fHww",
    },
    {
      activity_type: "Indoor",
      activity_img:
        "https://media.istockphoto.com/id/682635620/photo/seniors-playing-dominoes.jpg?s=612x612&w=0&k=20&c=NBZeQUuzjAnLu9Dh61gzulrlX2XegJohecspCAhwp9k=",
    },
    {
      activity_type: "Outdoor",
      activity_img:
        "https://www.shutterstock.com/shutterstock/photos/1894236736/display_1500/stock-vector-family-different-autumn-holiday-traditions-and-celebrations-set-people-characters-parents-1894236736.jpg",
    },
  ]);

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
  const initialFeelingOptions = ["Happy", "Relax", "Inspired", "Stressed"];
  const [selectedPersonalization, setSelectedPersonalization] = useState(
    initialPersonalizationOptions
  );
  const [personalizationOptions, setPersonalizationOptions] = useState(
    initialPersonalizationOptions
  );
  const [feelingOptions, setFeelingOptions] = useState(initialFeelingOptions);
  const [selectedActivities, setSelectedActivities] = useState(bothActivities);
  const [likesOptions, setLikesOptions] = useState(bothActivities);

  useEffect(() => {
    if (prompt) {
      setShowRecommendations(true);
    }
  }, [prompt]);

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
      setSelectedActivities([...indoorActivities, ...outdoorActivities]);
    }
  };

  const handleAddLikeOption = (option) => {
    setLikesOptions((prev) => [...prev, option]);
  };

  const handleAddFeelingOption = (option) => {
    setFeelingOptions((prev) => [...prev, option]);
  };

  const handleSelectLike = (selectedOption) => {
    setSelectedLikes((prevSelectedOptions) =>
      prevSelectedOptions.includes(selectedOption)
        ? prevSelectedOptions.filter((option) => option !== selectedOption)
        : [...prevSelectedOptions, selectedOption]
    );
  };

  const handleSelectFeeling = (selectedOption) => {
    setSelectedFeelings((prevSelectedOptions) =>
      prevSelectedOptions.includes(selectedOption)
        ? prevSelectedOptions.filter((option) => option !== selectedOption)
        : [...prevSelectedOptions, selectedOption]
    );
  };

  const handleSelectPersonalization = (option) => {
    setSelectedPersonalization((prev) => {
      const existingIndex = prev.findIndex((opt) => opt.label === option.label);
      if (existingIndex >= 0) {
        const newArray = [...prev];
        newArray[existingIndex] = option;
        return newArray;
      } else {
        return [...prev, option];
      }
    });
  };

  const createPrompt = (payload) => {
    const {
      selectedLikes,
      selectedFeelings,
      personalizationOptions,
      location,
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

    return `Hey, I am looking for recommendations for activities that match the following details: 
      - Likes: ${likesText}
      - Feelings: ${feelingsText}
      - Personalization options: ${optionsText}
      - Location: ${locationText}
      Can you suggest some options?`;
  };

  const handleSearch = () => {
    const newPayload = {
      selectedLikes,
      selectedFeelings,
      personalizationOptions: selectedPersonalization,
      location: selectedLocation?.formatted_address,
    };
    setPayload(newPayload);
    const newPrompt = createPrompt(newPayload);
    setPrompt(newPrompt);
    console.log(newPrompt);
  };

  return (
    <>
      {showRecommendation ? (
        <Page prompt={prompt} cb={setShowRecommendations} />
      ) : (
        <div className="min-h-screen m-auto flex flex-col gap-4 w-[90%] font-semibold tr04">
          <div className="text-3xl pt-5">Explore</div>
          <div className="mb-2">
            <LocationSearchBar
              apiKey={apiKey}
              onPlaceSelected={handlePlaceSelected}
            />
          </div>
          <div className="flex flex-col gap-4 py-4">
            <div className="text-xl font-semibold">I'm interested in</div>
            <div
              className={`flex items-center justify-between rounded-full p-1 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {activityType.map((activity, idx) => (
                <div
                  key={idx}
                  className={`flex-1 text-center py-2 rounded-full cursor-pointer transition-colors duration-200 ${
                    selectedActivityType === activity?.activity_type
                      ? `${
                          theme === "dark"
                            ? "bg-gray-700 text-white"
                            : "bg-white text-black"
                        } font-bold`
                      : `${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`
                  }`}
                  onClick={() => toggleActivityTab(activity?.activity_type)}
                >
                  {activity?.activity_type}
                </div>
              ))}
            </div>
          </div>
          <SelectableOptions
            selectedOptions={selectedLikes}
            options={likesOptions}
            onAdd={handleAddLikeOption}
            onSelect={handleSelectLike}
          />
          <SelectableOptions
            selectedOptions={selectedFeelings}
            options={feelingOptions}
            onAdd={handleAddFeelingOption}
            onSelect={handleSelectFeeling}
          />
          <PersonalizationOptions
            options={personalizationOptions}
            onAdd={handleAddLikeOption}
            onSelect={handleSelectPersonalization}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 4,
              marginBottom: 3,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className="w-full"
              onClick={handleSearch}
            >
              Let's Go
            </Button>
          </Box>
          <BottomNavigation
            style={{
              position: "sticky",
              bottom: 0,
              zIndex: 100,
              borderTop: "1px solid",
            }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
            <BottomNavigationAction label="History" icon={<HistoryIcon />} />
          </BottomNavigation>
        </div>
      )}
    </>
  );
}
