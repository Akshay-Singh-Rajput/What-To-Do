import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './RecommendationCard.css';

const RecommendationCard = ({ places, error }) => {
  const [imageSrc, setImageSrc] = useState(places?.activity_image || '');
  const fallbackImage = "https://thumbs.dreamstime.com/b/happy-couple-love-travel-raised-hands-cliff-happy-couple-love-travel-raised-hands-cliff-norway-man-woman-112188598.jpg";

  const handleImageError = () => {
    setImageSrc(fallbackImage);
  };

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }

  const [latitude, longitude] = [0, 0]
  // places?.geo_coordinates?.replace(/[^\d.,-]/g, '')?.split(',').map(coord => coord.trim()); 
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <Card className="recommendation-card">
      <CardMedia
        component="img"
        alt={places?.activity_name || 'Activity Image'}
        height="140"
        image={imageSrc}
        onError={handleImageError}
        className="card-image"
      />
      <CardContent>
        <Typography variant="h5" component="div" className="activity-name">
          {places.activity_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="activity-description">
          {places.activity_description}
        </Typography>
        <Typography variant="body2" color="text.primary" className="pricing">
          <strong>Pricing: </strong> {places.pricing}
        </Typography>
        <Typography variant="body2" color="text.primary" className="location">
          <strong>Location: </strong> {places.location}
        </Typography>
        <Typography variant="body2" color="text.primary" className="place-address">
          <strong>Address: </strong> {places.place_address}
        </Typography>
        <Typography variant="body2" color="text.primary" className="geo-coordinates">
          <strong>Coordinates: </strong> 
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="google-maps-link">
            {places?.geo_coordinates}
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;



















// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import { Image } from '@mui/icons-material';

// const RecommendationCard = ({ title, description, error }) => {
//   if (error) {
//     return <div>{ error }</div>;
//   }

//   // if (!title && !description) {
//   //   return <div>Please try again</div>;
//   // }


//   let places =
//   {
//     "activity_name": "Visit the Kingdom of Dreams",
//     "activity_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4_d31_15W7jK_H11Q3M9J4V5-u96nX80J_Q&usqp=CAU",
//     "activity_description": "Experience a vibrant cultural extravaganza at the Kingdom of Dreams, featuring live performances, musicals, and a taste of Indian heritage.",
//     "pricing": "₹500 - ₹1,500 per person",
//     "geo_coordinates": "28.4595° N, 77.0266° E",
//     "place_address": "Sector 29, Gurugram, Haryana 122001",
//     "location": "Gurugram, Haryana, India"
//   };


//   return (
//     <>
//       <Card sx={ { maxWidth: 345, margin: 1 } }>
//         <Image values={ places.activity_image } />
//         <CardContent>
//           { title && (
//             <Typography variant="h5" component="div">
//               { title }
//             </Typography>
//           ) }
//           { description && (
//             <Typography variant="body2" color="text.secondary">
//               { description }
//             </Typography>
//           ) }
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default RecommendationCard;

 // const places = {
  //   activity_name: "Visit the Kingdom of Dreams",
  //   activity_image: "https://cdn.dribbble.com/userupload/4391227/file/original-3bd9433655e67aabe8fd2c65821250b5.png?resize=400x0",
  //   activity_description: "Experience a vibrant cultural extravaganza at the Kingdom of Dreams, featuring live performances, musicals, and a taste of Indian heritage.",
  //   pricing: "₹500 - ₹1,500 per person",
  //   geo_coordinates: "28.4595° N, 77.0266° E",
  //   place_address: "Sector 29, Gurugram, Haryana 122001",
  //   location: "Gurugram, Haryana, India",
  // };