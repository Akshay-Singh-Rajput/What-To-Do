import React, { useState } from "react";
import {Autocomplete } from "@react-google-maps/api";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import "./LocationSearchBar.css"
const libraries = ["places"];

const LocationSearchBar = ({ apiKey, onPlaceSelected }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (auto) => {
    setAutocomplete(auto);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place) {
        onPlaceSelected(place);
      } else {
        console.error("No place data available");
      }
    } else {
      console.error("Autocomplete is not initialized");
    }
  };

  return (
    <div
      className="w-full text-center relative mb-5"
    >
     
        <div className="absolute w-full">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <TextField
              type="text"
              className="shadow-md focus:outline-none border bg-gray-400 flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 gap-2 text-white font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
              placeholder="Where are you going?..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="text-gray-500 " />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                className: "text-gray-500",
              }}
            />
          </Autocomplete>
        </div>
    </div>
  );
};

export default LocationSearchBar;