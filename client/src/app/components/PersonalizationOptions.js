import React from "react";
import { Box, Button, Typography } from "@mui/material";

function PersonalizationOptions({
  personalizationOptions = [], 
  onSelectPersonalization,
  handleShowAdvancePreferences,
}) {
  return (
    <Box sx={{ marginY: 2 }}>
      <Typography variant="h6">Personalize your pick</Typography>
      {personalizationOptions.map((option, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Typography variant="body1">{option.label}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSelectPersonalization(option)}
          >
            Select
          </Button>
        </Box>
      ))}
      <Button onClick={handleShowAdvancePreferences}>Advanced Preferences</Button>
    </Box>
  );
}

export default PersonalizationOptions;
