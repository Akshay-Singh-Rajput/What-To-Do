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




import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const RecommendationCard = ({ places, error }) => {
  const [ imageSrc, setImageSrc ] = useState(
    places?.activity_image || ''
  );

  const fallbackImage = "https://demofree.sirv.com/products/123456/123456.jpg?profile=error-example";

  const handleImageError = () => {
    setImageSrc(fallbackImage);
  };


  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 border border-red-300 rounded">
        { error }
      </div>
    );
  }

  // const places = {
  //   activity_name: "Visit the Kingdom of Dreams",
  //   activity_image: "https://cdn.dribbble.com/userupload/4391227/file/original-3bd9433655e67aabe8fd2c65821250b5.png?resize=400x0",
  //   activity_description: "Experience a vibrant cultural extravaganza at the Kingdom of Dreams, featuring live performances, musicals, and a taste of Indian heritage.",
  //   pricing: "₹500 - ₹1,500 per person",
  //   geo_coordinates: "28.4595° N, 77.0266° E",
  //   place_address: "Sector 29, Gurugram, Haryana 122001",
  //   location: "Gurugram, Haryana, India",
  // };

  return (
    <Card sx={ { maxWidth: 345, margin: 1 } } className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardMedia
        component="img"
        alt={ places?.activity_name || 'Activity Image' }
        height="140"
        image={ imageSrc }
        onError={ handleImageError }
        className="object-cover"
      />
      <CardContent>
        <Typography variant="h5" component="div" className="font-bold mb-2">
          { places.activity_name }
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          { places.activity_description }
        </Typography>
        <Typography variant="body2" color="text.primary" className="mb-1">
          <strong>Pricing:</strong> { places.pricing }
        </Typography>
        <Typography variant="body2" color="text.primary" className="mb-1">
          <strong>Location:</strong> { places.location }
        </Typography>
        <Typography variant="body2" color="text.primary" className="mb-1">
          <strong>Address:</strong> { places.place_address }
        </Typography>
        <Typography variant="body2" color="text.primary">
          <strong>Coordinates:</strong> { places.geo_coordinates }
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;

