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
import TypingEffect from "../../app/components/TypingEffect";

const Page = ({ prompt, cb }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState("");
  const messagesEndRef = useRef(null);
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
    console.log(inputMessage, "input message");
    const message = inputMessage;
    if (message.trim() === "") return;

    // Add user message to chat
    setMessages([...messages, { sender: "user", text: message }]);
    setIsTyping(true); // Show typing indicator

    // Fetch suggestion from API
    axios
      .post(
        "/ai/suggestions",
        { prompt: message },
        {
          headers: {
            accepts: "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => {
        setApiResponse(response.data.content);

        // Add empty message for typing effect and hide typing indicator
        setMessages([
          ...messages,
          { sender: "user", text: message },
          { sender: "model", text: "" },
        ]);
        setIsTyping(false);
        cb(true); // Call the callback with true to indicate successful response
      })
      .catch((error) => {
        setIsTyping(false);
        cb(false); // Call the callback with false to indicate error
        console.error("Error:", error);
      });
  };

  const handleTypingComplete = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderCards = () => {
    if (!apiResponse) return null;
    return <Typography>{apiResponse}</Typography>;
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
                {/* Render user and model messages */}
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <Box
                      className="max-w-[90%] rounded-lg py-2 px-4 my-1"
                      sx={{
                        backgroundColor:
                          message.sender === "user"
                            ? "primary.main"
                            : "grey.200",
                        color: message.sender === "user" ? "white" : "black",
                        textAlign: message.sender === "user" ? "right" : "left",
                      }}
                    >
                      {message.sender === "user" ? (
                        message.text
                      ) : (
                        <TypingEffect
                          text={message.text}
                          onTypingComplete={handleTypingComplete}
                        />
                      )}
                    </Box>
                  </Box>
                ))}
                {isTyping && (
                  <Box className="max-w-xs bg-gray-200 text-black rounded-lg p-2 my-1 self-start">
                    <TypingEffect text="Typing..." />
                  </Box>
                )}
                {/* Render cards on top of the input field */}
                <Box className="flex flex-wrap mt-4">{renderCards()}</Box>
                <div ref={messagesEndRef} />
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
