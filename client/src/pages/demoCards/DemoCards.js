import React, { useEffect, useState } from "react";
import RecommendationCard from "../suggestion/RecommendationCard";
import { useGlobalContext } from "../../app/context/GlobalContext";
import { CircularProgress, Box, Typography, Button } from "@mui/material";

function DemoCards() {
  const { currentActivities = [], previousActivities = [], setIsBottomSheetOpen } = useGlobalContext();

  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (currentActivities.length > 0) {
      setLoading(false);
    }
  }, [ currentActivities ]);

  if (loading) {
    return (
      <Box
        sx={ {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        } }
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={ { p: 3 } }>
      { currentActivities.length === 0 ? <>
        <div className="text-center">
          <Typography variant="h6" gutterBottom className="mb-4">
            No activities have been created yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={ () => setIsBottomSheetOpen(true) }
            className="w-full max-w-xs"
          >
            Create First Activity
          </Button>
        </div>
      </>
        :
        currentActivities.map((place) => (
          <RecommendationCard key={ place.id } places={ place } />
        ))
      }
      {/* {currentActivities.length === 0 ? (
        <Typography variant="h6" align="center">No activities found</Typography>
      ) : (
        currentActivities.map((place) => (
          <RecommendationCard key={place.id} places={place} />
        ))
      )} */}
    </Box>
  );
}

export default DemoCards;
