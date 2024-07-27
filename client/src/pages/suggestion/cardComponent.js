import React from 'react';
import { Card as MCard, CardContent, Typography, Link, CardMedia, Stack } from '@mui/material';

const CardComponent = ({ place }) => {
  return (
    <MCard
      sx={{
        maxWidth: 345,
        margin: '1rem',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
        }
      }}
    >
      {/* Optionally add an image */}
      <CardMedia
        component="img"
        height="140"
        image={`https://via.placeholder.com/345x140?text=${encodeURIComponent(place.name)}`}
        alt={place.name}
        sx={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      />

      <CardContent>
        <Stack spacing={1}>
          <Typography gutterBottom variant="h5" component="div">
            {place.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Budget:</strong> {place.budget}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Distance:</strong> {place.distance}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Reviews:</strong> {place.reviews}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Images:</strong> 
            <Link href={`https://www.google.com/search?q=${place.images_search}`} target="_blank" rel="noopener">
              Search Images
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Google Maps:</strong> 
            <Link href={place.google_maps} target="_blank" rel="noopener">
              View on Maps
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </MCard>
  );
};

export default CardComponent;
