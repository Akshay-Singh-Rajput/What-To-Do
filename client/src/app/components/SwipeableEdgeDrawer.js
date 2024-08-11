import React, { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LocationSearchBar from "./LocationSearchBar";
import { Typography, CircularProgress } from "@mui/material";
import Page from "../../pages/suggestion/page";
import { useImmer } from "use-immer";
import AdvanceActivityForm from "./AdvanceActivityForm";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useGlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/router";

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

const LoaderOverlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1200,
}));

function SwipeableEdgeDrawer(props) {
  const { window, isOpen, open, setOpen } = props;
  const { user } = useAuth();
  const { currentActivities, setCurrentActivities } = useGlobalContext();
  const [prompt, setPrompt] = useState("");
  const [currentPage, setCurrentPage] = useState("initial");
  const [personalizationOptions, setPersonalizationOptions] = useState([
    { label: "Distance", value: "5" },
  ]);
  const [selectedPersonalization, setSelectedPersonalization] = useState(
    personalizationOptions
  );
  const [activityForm, setActivityForm] = useImmer({
    location: "",
    nDays: 1,
    nHrs: 1,
    nPeople: "",
    budget: "",
    radius: "",
    activities: [],
    feelings: [],
    gender: "All",
    ageRange: "",
    interests: ""
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
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

  const handleActivitryForm = ({ key, value }) => {
    setActivityForm(state => {
      state[key] = value;
    });
  };

  const handleGenerateActivity = () => {
    setLoading(true);
    setOpen(false); 
    setTimeout(() => {
      axios.post(
        "/ai/suggestions",
        { payload: activityForm },
        {
          headers: {
            accepts: "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
        .then((response) => {
          setCurrentActivities(response.data.content);
          setApiResponse(response.data.content);
          router.push('/demoCards/DemoCards');
        })
        .catch((error) => {
          console.error({ error });
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300); 
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
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={Number(drawerBleeding)}
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
            <Page activityForm={activityForm} cb={setCurrentPage} />
          ) : currentPage === "personalization" ? (
            <div>
              <AdvanceActivityForm
                activityForm={activityForm}
                handleActivitryForm={handleActivitryForm}
                handleGenerateActivity={handleGenerateActivity}
              />
            </div>
          ) : (
            <div className="relative flex size-full flex-col justify-between group/design-root overflow-x-hidden">
              <div className="flex justify-center text-2xl font-semibold mb-10">
                Find your best activities
              </div>
              <div className="px-4 py-3 mb-10">
                <LocationSearchBar
                  apiKey={apiKey}
                  searchField={activityForm.location}
                  onPlaceSelected={(place) =>
                    handleActivitryForm({ key: "location", value: place.formatted_address })
                  }
                />
              </div>
              <div className="text-base font-medium mb-2">Travel Partner</div>
              <div className="flex flex-col px-4 py-4 mb-4 border-slate-600 border rounded-lg shadow-sm">
                <div className="group flex-1">
                  {["Just me", "A couple", "Family", "Friends"].map((option) => (
                    <p
                      key={option}
                      className={`text-sm w-full font-bold leading-normal tracking-[0.015em] flex h-11 items-center justify-center truncate px-4 text-center group-[:first-child]:rounded-l-full group-[:last-child]:rounded-r-full ${
                        activityForm.nPeople === option ? "text-white bg-slate-400" : ""
                      }`}
                      onClick={() => handleActivitryForm({ key: "nPeople", value: option })}
                    >
                      {option}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-base font-medium leading-normal pb-2">
                    Radius(kms)
                  </p>
                  <div className="flex w-full flex-1 items-stretch rounded-xl">
                    <input
                      placeholder="50 kms"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl focus:outline-0 focus:ring-0 border-none bg-gray-100 focus:border-none h-14 placeholder:text-gray-500 p-4 rounded-r-none border-r-0 pr-2 text-black font-normal leading-normal"
                      value={activityForm.radius}
                      onChange={({ target: { value } }) => handleActivitryForm({ key: "radius", value })}
                    />
                    <div
                      className="bg-slate-300 rounded-r-xl flex h-14 items-center justify-center px-4 cursor-pointer"
                      role="button"
                    >
                      <div
                        className="iconify"
                        data-icon="map-pin"
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
                  </div>
                </label>
              </div>
              <div className="mt-5 flex justify-center">
                <Button
                  onClick={handleShowAdvancePreferences}
                  variant="outlined"
                  color="primary"
                >
                  Go Advance Personalization
                </Button>
              </div>
              <Typography className="my-4 text-center">OR</Typography>
              <Button
                variant="contained"
                color="primary"
                className="px-4 py-2 flex items-center justify-center rounded-lg"
                onClick={handleGenerateActivity}
              >
                Find Your Ideal Activities
              </Button>
            </div>
          )}
          {loading && (
            <LoaderOverlay>
              <CircularProgress />
            </LoaderOverlay>
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
