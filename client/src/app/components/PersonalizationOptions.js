import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
} from "@mui/material";

const PersonalizationOptions = ({ options, onAdd, onSelect }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [ageSelectOpen, setAgeSelectOpen] = useState(false);
  const [genderSelectOpen, setGenderSelectOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedDistance, setSelectedDistance]=useState("");

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGenderClick = () => {
    setGenderSelectOpen(true);
  };

  const handleAddOption = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
      setShowInput(false);
    }
  };

  const handleAgeClick = () => {
    setAgeSelectOpen(true);
  };

  const handleAgeChange = (event) => {
    const value = event.target.value;
    setSelectedAge(value);
    onSelect({ label: "Age", value });
    setAgeSelectOpen(false);
  };
  const handleDistanceChange=(e)=>{
    setSelectedDistance(e.target.value)
  }

  return (
    <Box sx={{ marginY: 2 }}>
      <Typography variant="h6">Personalize your pick</Typography>
      {options.map((option, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 1,
          }}
        >
          <Typography>{option.label}</Typography>
          {option.label === "Age" && (
            <FormControl className="w-[40%]" variant="outlined" size="small">
              <InputLabel>Age</InputLabel>
              <Select
                onClick={(event) => handleAgeClick(event.target.value)}
                label="Age"
              >
                <MenuItem value="-18">-18</MenuItem>
                <MenuItem value="18-25">18-25</MenuItem>
                <MenuItem value="26-35">26-35</MenuItem>
                <MenuItem value="36-45">36-45</MenuItem>
                <MenuItem value="46-60">46-60</MenuItem>
                <MenuItem value="60+">60+</MenuItem>
              </Select>
            </FormControl>
          )}
          {option.label === "Gender" && (
            <FormControl className="w-[40%]" variant="outlined" size="small">
              <InputLabel>Gender</InputLabel>
              <Select
                onClick={(event) => handleGenderClick(event.target.value)}
                label="Age"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          )}
           {option.label === "Distance" && (
            <Box sx={{ width: "40%" }}> {/* Adjust the width here */}
              <Slider
                value={selectedDistance}
                onChange={handleDistanceChange}
                min={0}
                max={1000}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
              />
              <Typography variant="body2" gutterBottom>
                Distance: {selectedDistance} km
              </Typography>
            </Box>
          )}
        </Box>
      ))}
      {showInput && (
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}
        >
          <TextField
            size="small"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add option"
          />
          <Button variant="contained" onClick={handleAddOption}>
            Add
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PersonalizationOptions;
