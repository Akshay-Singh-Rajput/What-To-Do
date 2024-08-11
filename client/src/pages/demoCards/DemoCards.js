import React, { useEffect, useState } from "react";
import RecommendationCard from "../suggestion/RecommendationCard";
import { useGlobalContext } from "../../app/context/GlobalContext";
import { CircularProgress, Box, Typography } from "@mui/material";
import Loader from "../../app/components/Loader";
function DemoCards() {
  const { currentActivities = [] } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentActivities.length > 0) {
      setLoading(false);
    }
  }, [currentActivities]);

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
        <Typography variant="h6" align="center">No activities found</Typography>
      ) : (
        currentActivities.map((place) => (
          <RecommendationCard key={place.id} places={place} />
        ))
      )}
    </Box>
  );
}

export default DemoCards;
