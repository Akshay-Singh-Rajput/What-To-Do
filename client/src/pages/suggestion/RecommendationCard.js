import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const RecommendationCard = ({ title, description, error }) => {
  if (error) {
    return <div>{error}</div>;
  }

  if (!title && !description) {
    return <div>Please try again</div>;
  }

  return (
    <Card sx={{ maxWidth: 345, margin: 1 }}>
      <CardContent>
        {title && (
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
