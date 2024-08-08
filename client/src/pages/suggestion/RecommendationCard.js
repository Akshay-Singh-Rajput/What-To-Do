import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const RecommendationCard = ({ title, description }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
