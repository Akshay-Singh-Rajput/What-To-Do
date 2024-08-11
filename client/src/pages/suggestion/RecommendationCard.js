import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const RecommendationCard = ({ title, description, error }) => {
  if (error) {
    return <div>{error}</div>;
  }

  if (!title && !description) {
    return <div>Please try again</div>;
  }


  let x = [
    {
      "activity_name": "Hiking in the Aravalli Hills",
      "activity_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thrillophilia.com%2Fblog%2Ftrekking-near-delhi%2F&psig=AOvVaw3Fz7Y68p78eC0C_wY3L_6F&ust=1701441346020000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJCs08D5gv4CFQAAAAAdAAAAABAJ",
      "activity_description": "Embark on a scenic hike through the Aravalli Hills, just outside Delhi. Explore the rocky terrain, enjoy breathtaking views, and breathe in the fresh air. This is a great way to get some exercise, connect with nature, and feel inspired.",
      "pricing": "₹500-₹1000 per person",
      "geo_coordinates": "28.6139° N, 77.2090° E",
      "place_address": "Aravalli Hills, Delhi",
      "location": "Delhi"
    }
  ]

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
