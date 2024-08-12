import React from "react";
import { Skeleton, Box } from "@mui/material";

const SkeletonComponent = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {[...Array(10)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width="100%"
          height={150}
          sx={{ marginBottom: 2 }}
        />
      ))}
    </Box>
  );
};

export default SkeletonComponent;
