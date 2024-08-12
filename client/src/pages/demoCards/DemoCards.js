import React, { useEffect, useState } from "react";
import RecommendationCard from "../../app/components/RecommendationCard";
import { useGlobalContext } from "../../app/context/GlobalContext";
import { Box, Typography, Button } from "@mui/material";
import Loader from "../../app/components/Loader";

function DemoCards() {
  const { currentActivities = [], previousActivities = [], setIsBottomSheetOpen } = useGlobalContext();

  const [loading, setLoading] = useState(false);


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {currentActivities.length === 0 ? (
        <div className="text-center">
          <Typography variant="h6" gutterBottom className="mb-4">
            No activities have been created yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsBottomSheetOpen(true)}
            className="w-full max-w-xs"
          >
            Create First Activity
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-8 items-center">

          {currentActivities.map((place) => (
            <RecommendationCard key={place.id} places={place} />
          ))}
        </div>
      )}
    </Box>
  );
}

export default DemoCards;
