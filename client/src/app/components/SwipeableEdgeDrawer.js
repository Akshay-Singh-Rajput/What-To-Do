import React, { useState } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LocationSearchBar from "./LocationSearchBar";
import { Typography } from "@mui/material";
import Link from "next/link";

const drawerBleeding = 56;

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

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function SwipeableEdgeDrawer(props) {
  const { window, isOpen } = props;
  const [open, setOpen] = useState(isOpen);
  const [selectedOption, setSelectedOption] = useState("A couple");
  const [travelDistance, setTravelDistance] = useState("");
  const [finalData, setFinalData] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const apiKey = "AIzaSyD55Jf-yj3s7jUla7VnaVSU6HyH2doHBWs"; // Gemini Api key

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
  const handleTripDetails = () => {
    let payload = {
      location: selectedLocation,
      numOfPeople: selectedOption,
      travelDistance: travelDistance,
    };
    console.log(payload, "final data");
    setFinalData(payload);
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
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
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography
            className="font-semibold"
            sx={{ p: 2, color: "text.secondary" }}
          >
            Unleash the explorer in you...
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <div className="relative flex size-full  flex-col bg-[#f8fafb] justify-between group/design-root overflow-x-hidden">
            <div>
              <div className="flex items-center bg-[#f8fafb] p-4 pb-2 justify-center text-xl text-black font-semibold">
                TripWiser
              </div>

              <div className="px-4 py-3">
                <LocationSearchBar
                  apiKey={apiKey}
                  onPlaceSelected={handlePlaceSelected}
                />
              </div>
              <div className="flex px-4 py-1">
                <div className="group flex-1">
                  <p
                    className={`text-sm font-bold leading-normal tracking-[0.015em] flex h-11 items-center justify-center truncate px-4 text-center group-[:first-child]:rounded-l-full group-[:last-child]:rounded-r-full ${
                      selectedOption === "Just me"
                        ? "text-[#0e161b] bg-[#e8eef3]"
                        : "text-[#afc5d4]"
                    }`}
                    onClick={() => handleOptionClick("Just me")}
                  >
                    Just me
                  </p>
                  <p
                    className={`text-sm font-bold leading-normal tracking-[0.015em] flex h-11 items-center justify-center truncate px-4 text-center group-[:first-child]:rounded-l-full group-[:last-child]:rounded-r-full ${
                      selectedOption === "A couple"
                        ? "text-[#0e161b] bg-[#e8eef3]"
                        : "text-[#afc5d4]"
                    }`}
                    onClick={() => handleOptionClick("A couple")}
                  >
                    A couple
                  </p>
                  <p
                    className={`text-sm font-bold leading-normal tracking-[0.015em] flex h-11 items-center justify-center truncate px-4 text-center group-[:first-child]:rounded-l-full group-[:last-child]:rounded-r-full ${
                      selectedOption === "Family/Friends"
                        ? "text-[#0e161b] bg-[#e8eef3]"
                        : "text-[#afc5d4]"
                    }`}
                    onClick={() => handleOptionClick("Family/Friends")}
                  >
                    Family/Friends
                  </p>
                </div>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#0e161b] text-base font-medium leading-normal pb-2">
                    Travel distance
                  </p>
                  <div className="flex w-full flex-1 items-stretch rounded-xl">
                    <input
                      placeholder="50 miles"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e161b] focus:outline-0 focus:ring-0 border-none bg-[#e8eef3] focus:border-none h-14 placeholder:text-[#507a95] p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                      value={travelDistance}
                      onChange={handleInputChange}
                    />
                    <div
                      className="text-[#507a95] flex border-none bg-[#e8eef3] items-center justify-center pr-4 rounded-r-xl border-l-0"
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
                        <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
                      </svg>
                    </div>
                  </div>
                </label>
              </div>
              <div className="flex justify-stretch">
                <div className="flex flex-1 gap-3 flex-col px-4 py-3 justify-center">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#1d8cd7] text-[#f8fafb] text-base font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate" onClick={handleTripDetails}>
                      Submit
                    </span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#e8eef3] text-[#0e161b] text-base font-bold leading-normal tracking-[0.015em]">
                    <Link className=" w-full" href="/profile/Home">
                      <span className="truncate">Advanced Preferences</span>
                    </Link>
                  </button>
                </div>
              </div>
              <div className="h-5 bg-[#f8fafb]"></div>
            </div>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
