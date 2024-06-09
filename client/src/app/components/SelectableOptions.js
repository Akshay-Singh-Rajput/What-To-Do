import React, { useState } from 'react';
import { Chip, Box, Typography, TextField, Button } from '@mui/material';

const SelectableOptions = ({ title, options, onAdd, onSelect }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddActivity = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
      setShowInput(false);
    }
  };

  return (
    <Box sx={{ marginY: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
        {options.map((option, index) => (
          <Chip key={index} label={option} clickable onClick={() => onSelect(option)} />
        ))}
        {showInput ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Add activity"
            />
            <Button variant="contained" onClick={handleAddActivity}>Add</Button>
          </Box>
        ) : (
          <Chip label="Others" clickable onClick={handleAddClick} />
        )}
      </Box>
    </Box>
  );
};

export default SelectableOptions;
