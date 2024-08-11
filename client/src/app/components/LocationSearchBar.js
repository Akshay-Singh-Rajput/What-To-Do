import React, { useState, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const LocationSearchBar = ({ apiKey, onPlaceSelected }) => {
  return "";
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
    <div>
      <LoadScript
        googleMapsApiKey={apiKey}
        libraries={libraries}
        onLoad={() => console.log("Google Maps API script loaded")}
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input type="text" placeholder="Search for places" />
        </Autocomplete>
      </LoadScript>
    </div>
  );
};

export default LocationSearchBar;
