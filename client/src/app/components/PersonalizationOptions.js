import React, { useState } from 'react';
import { Box, Typography, Chip, TextField, Button } from '@mui/material';

const PersonalizationOptions = ({ options, onAdd, onSelect }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddOption = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
      setShowInput(false);
    }
  };

  return (
    <Box sx={{ marginY: 2 }}>
      <Typography variant="h6">Personalize your pick</Typography>
      {options.map((option, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
          <Typography>{option.label}</Typography>
          <Chip label={option.value} clickable onClick={() => onSelect(option.value)} />
        </Box>
      ))}
      {showInput ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 1 }}>
          <TextField
            size="small"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add option"
          />
          <Button variant="contained" onClick={handleAddOption}>Add</Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
          <Typography>Others</Typography>
          <Chip label="Add" clickable onClick={handleAddClick} />
        </Box>
      )}
    </Box>
  );
};

export default PersonalizationOptions;
