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
  const [currentPage, setCurrentPage] = useState("initial"); 
  const [personalizationOptions, setPersonalizationOptions] = useState([
    { label: "Distance", value: "5" },
  ]);
  const [selectedPersonalization, setSelectedPersonalization] = useState(
    personalizationOptions
  );

  const apiKey = "AIzaSyD55Jf-yj3s7jUla7VnaVSU6HyH2doHBWs"; 

  useEffect(() => {
    if (prompt) {
      setCurrentPage("recommendations"); 
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
    setCurrentPage("personalization"); 
  };

  const handleBack = () => {
    setCurrentPage("initial"); 
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
          {currentPage !== "initial" && (
            <Button onClick={handleBack}>Back</Button>
          )}
          {currentPage === "recommendations" ? (
            <Page prompt={prompt} cb={setCurrentPage} />
          ) : currentPage === "personalization" ? (
            <div>
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
                    Travel distance(kms)
                  </p>
                  <div className="flex w-full flex-1 items-stretch rounded-xl ">
                    <input
                      placeholder="50 kms"
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
                        <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-88A88.1,88.1,0,0,0,40,128c0,31.14,12.29,62.92,36.55,90.43a254.71,254.71,0,0,0,35.3,34.08,8,8,0,0,0,10.29,0c10.17-8.23,19.78-17.61,28.5-27.67A8,8,0,1,0,140.35,213a238.55,238.55,0,0,1-34.6,34.08C68.79,159.73,56,129.39,56,104a72,72,0,0,1,144,0C200,129.39,187.21,159.73,162.6,188.48Z"></path>
                      </svg>
                    </div>
                  </div>
                </label>
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-blue-800 text-white h-14 w-14 p-0 flex items-center justify-center rounded-lg hover:bg-black text-sm"
                  onClick={handleTripDetails}
                >
                  Next
                </Button>
              </div>
              <div className="mt-5">
                <Typography>Advance Personalization</Typography>
                <Button
                  onClick={handleShowAdvancePreferences}
                  variant="contained"
                  color="primary"
                >
                  Personalize
                </Button>
              </div>
            </div>
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
