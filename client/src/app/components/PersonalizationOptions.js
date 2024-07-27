import React, { useState } from "react";
import {
  Box,
  Typography,
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
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedDistance, setSelectedDistance] = useState(5);

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddOption = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
      setShowInput(false);
    }
  };

  const handleAgeChange = (event) => {
    const value = event.target.value;
    setSelectedAge(value);
    onSelect({ label: "Age", value });
  };

  const handleGenderChange = (event) => {
    const value = event.target.value;
    setSelectedGender(value);
    onSelect({ label: "Gender", value });
  };

  const handleDistanceChange = (event, value) => {
    setSelectedDistance(value);
    onSelect({ label: "Distance", value });
  };

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
                value={selectedAge}
                onChange={handleAgeChange}
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
                value={selectedGender}
                onChange={handleGenderChange}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          )}
          {option.label === "Distance" && (
            <Box sx={{ width: "40%" }}>
              <Slider
                value={selectedDistance}
                onChange={handleDistanceChange}
                min={0}
                max={1000}
                step={1}
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
