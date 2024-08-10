import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../../app/context/AuthContext";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItemText,
  ListItem,
} from "@mui/material";
import { useRouter } from "next/router";
import RecommendationCard from "./RecommendationCard";

const Page = ({ prompt, cb }) => {
  const { user } = useAuth();
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      if (!user?.token) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [user, router]);

  useEffect(() => {
    if (prompt) {
      handleSendMessage(prompt);
    }
  }, [prompt]);

  const handleSendMessage = (inputMessage) => {
    if (inputMessage.trim() === "") return;

    setIsTyping(true);

    axios
      .post(
        "/ai/suggestions",
        { prompt: inputMessage },
        {
          headers: {
            accepts: "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => {
        setApiResponse(response.data.content);
        setIsTyping(false);
        cb(true);
      })
      .catch((error) => {
        setIsTyping(false);
        cb(false);
        console.error("Error:", error);
      });
  };

  const parseResponse = (response) => {
    const cardsData = [];
    const sections = response.split("\n\n");

    sections.forEach((section) => {
      const lines = section.split("\n");
      if (lines.length > 1) {
        const titleLine = lines[0];
        const contentLines = lines.slice(1);

        if (titleLine.includes("**")) {
          const title = titleLine.replace(/\*\*/g, "").trim();
          const description = contentLines.join(" ").trim();
          cardsData.push({ title, description });
        }
      }
    });

    return cardsData;
  };

  const renderCards = () => {
    const cardsData = parseResponse(apiResponse);

    return cardsData.map((card, index) => (
      <RecommendationCard
        key={index}
        title={card.title}
        description={card.description}
      />
    ));
  };

  return (
    <Fragment>
      <Box
        className="h-full w-full p-10"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "black" : "white",
          color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
        }}
      >
        <Typography variant="h4" className="text-center mb-4">
          Interactive Chat: Communicate with Our AI Assistant
        </Typography>
        <Box className="w-full h-[90%] flex flex-col max-w-[60%] mx-auto p-4 border border-gray-300 rounded-xl">
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : user ? (
            <Fragment>
              <Box className="flex-1 overflow-y-auto mb-4 pr-4">
                {isTyping && (
                  <Box className="max-w-xs bg-gray-200 text-black rounded-lg p-2 my-1 self-start">
                    <Typography>Wait for the adventure...</Typography>
                  </Box>
                )}
                <Box className="flex flex-wrap mt-4">{renderCards()}</Box>
              </Box>
            </Fragment>
          ) : (
            <Box margin="auto" className="text-center">
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h4" component="div">
                        You must be logged in to view this page.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h5" component="div">
                        Tips: You can sign in with your Google account.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="div">
                        Redirecting you to home...
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </Box>
      </Box>
    </Fragment>
  );
};

export default Page;
