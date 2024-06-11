import React from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const AgeDropdown = ({ value, onSelect }) => {
  return (
    <FormControl className='w-[50%]' variant="outlined" size="small">
      <InputLabel>Age</InputLabel>
      <Select
        value={value}
        onChange={(event) => onSelect(event.target.value)}
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
  );
};

export default AgeDropdown;
