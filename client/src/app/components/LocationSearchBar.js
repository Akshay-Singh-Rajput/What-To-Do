import React, { useState } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const libraries = ['places'];

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
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <TextField
          type="text"
          className='rounded-lg'
          placeholder="Search for location..."
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default LocationSearchBar;
