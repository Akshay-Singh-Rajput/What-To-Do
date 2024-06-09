import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Autocomplete } from '@react-google-maps/api';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const libraries = ['places'];

const LocationSearchBar = ({ apiKey, onPlaceSelected }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}`;
      script.onload = () => {
        setAutocomplete(new window.google.maps.places.AutocompleteService());
      };
      document.head.appendChild(script);
    };

    if (!window.google) {
      window.addEventListener('load', loadGoogleMapsScript);
    } else {
      setAutocomplete(new window.google.maps.places.AutocompleteService());
    }

    return () => {
      window.removeEventListener('load', loadGoogleMapsScript);
    };
  }, [apiKey]);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
    <Autocomplete onLoad={(auto) => setAutocomplete(auto)} onPlaceChanged={onPlaceChanged}>
      <TextField
        type="text"
        className='rounded-lg'
        placeholder="Search For location..."
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
