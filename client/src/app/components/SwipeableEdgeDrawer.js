import React, { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LocationSearchBar from "./LocationSearchBar";
import { Typography } from "@mui/material";
import PersonalizationOptions from "./PersonalizationOptions";
import Home from "../../pages/profile/Home";
import Page from "../../pages/suggestion/page";

const drawerHeight = "90vh";
const drawerBleeding = "0";

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

function SwipeableEdgeDrawer(props) {
  const { window, isOpen } = props;
  const [open, setOpen] = useState(isOpen);
  const [selectedOption, setSelectedOption] = useState("A couple");
  const [travelDistance, setTravelDistance] = useState("");
  const [finalData, setFinalData] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [prompt, setPrompt] = useState("");
  const [showRecommendation, setShowRecommendations] = useState(false);
  const [isAdvancePreference, setIsAdvancePreference] = useState(false);
  const [personalizationOptions, setPersonalizationOptions] = useState([
    { label: "Distance", value: "5" },
  ]);
  const [selectedPersonalization, setSelectedPersonalization] = useState(
    personalizationOptions
  );

  const apiKey = "AIzaSyD55Jf-yj3s7jUla7VnaVSU6HyH2doHBWs"; // Gemini API key

  useEffect(() => {
    if (prompt) {
      setShowRecommendations(true);
    }
  }, [prompt]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleInputChange = (event) => {
    setTravelDistance(event.target.value);
  };

  const handlePlaceSelected = (place) => {
    console.log("Selected place:", place);
    setSelectedLocation(place);
  };

  const createPrompt = (payload) => {
    const { location, numOfPeople, travelDistance } = payload;

    return `Hey, I am planning a trip and would like recommendations for activities. Here are the details:
      - Location: ${location}
      - Number of people: ${numOfPeople}
      - Travel distance: ${travelDistance}km
      Can you suggest some options?`;
  };

  const handleTripDetails = () => {
    const payload = {
      location: selectedLocation?.formatted_address || "anywhere",
      numOfPeople: selectedOption,
      travelDistance: travelDistance || "any distance",
    };
    console.log(payload, "final data");
    setFinalData(payload);
    const newPrompt = createPrompt(payload);
    setPrompt(newPrompt);
    console.log(newPrompt);
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

  const handleShowAdvancePreferences = () => {
    setIsAdvancePreference(true);
  };

  const handleBack = () => {
    setIsAdvancePreference(false);
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: drawerHeight,
            overflow: "visible",
            background: "black",
            zIndex: 10,
            borderRadius: "20px",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Get Modal</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        />
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            pt: 6,
            height: `calc(${drawerHeight} - ${drawerBleeding}px)`,
            overflow: "auto",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          {showRecommendation ? (
            <Page prompt={prompt} cb={setShowRecommendations} />
          ) : isAdvancePreference ? (
            <div>
              <Button onClick={handleBack}>Back</Button>
              <Home />
            </div>
          ) : (
            <div className="relative flex size-full flex-col justify-between group/design-root overflow-x-hidden">
              <div className="flex justify-center text-2xl font-semibold">
                Explore
              </div>
              <div className="px-4 py-3 mb-10">
                <LocationSearchBar
                  apiKey={apiKey}
                  onPlaceSelected={handlePlaceSelected}
                />
              </div>
              <div className="text-base font-medium  mb-2">Travel Partner</div>
              <div className="flex flex-col px-4 py-4 mb-4 border-slate-600 border rounded-lg shadow-sm ">
                <div className="group flex-1">
                  {["Just me", "A couple", "Family", "Friends"].map(
                    (option) => (
                      <p
                        key={option}
                        className={`text-sm w-full font-bold leading-normal tracking-[0.015em] flex h-11 items-center justify-center truncate px-4 text-center group-[:first-child]:rounded-l-full group-[:last-child]:rounded-r-full ${
                          selectedOption === option
                            ? "text-white bg-slate-400"
                            : ""
                        }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </p>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-base font-medium leading-normal pb-2 ">
                    Travel distance
                  </p>
                  <div className="flex w-full flex-1 items-stretch rounded-xl ">
                    <input
                      placeholder="50 miles"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl focus:outline-0 focus:ring-0 border-none bg-gray-100 focus:border-none h-14 placeholder:text-gray-500 p-4 rounded-r-none border-r-0 pr-2 text-black font-normal leading-normal"
                      value={travelDistance}
                      onChange={handleInputChange}
                    />
                    <div
                      className="text-gray-500 flex border-none bg-gray-100 items-center justify-center pr-4 rounded-r-xl border-l-0"
                      data-icon="MapPin"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.11,0,254.19,254.19,0,0,0,41.45-38.3c27.49-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,208C100.68,199.78,56,152.84,56,104a72,72,0,0,1,144,0C200,152.84,155.32,199.78,128,224Z"></path>
                      </svg>
                    </div>
                  </div>
                </label>
              </div>
              <PersonalizationOptions
                personalizationOptions={personalizationOptions}
                onSelectPersonalization={handleSelectPersonalization}
                handleShowAdvancePreferences={handleShowAdvancePreferences}
              />

              <Button onClick={handleTripDetails}>Explore</Button>
            </div>
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
