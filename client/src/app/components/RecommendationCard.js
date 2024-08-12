import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./RecommendationCard.css";
import NearMeIcon from "@mui/icons-material/NearMe";

const RecommendationCard = ({ places, error }) => {
  const [imageSrc, setImageSrc] = useState(places?.activity_image || "");
  const fallbackImage =
    "https://thumbs.dreamstime.com/b/happy-couple-love-travel-raised-hands-cliff-happy-couple-love-travel-raised-hands-cliff-norway-man-woman-112188598.jpg";

  const handleImageError = () => {
    setImageSrc(fallbackImage);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const [latitude, longitude] = places?.geo_coordinates
    ?.replace(/[^\d.,-]/g, "")
    ?.split(",")
    .map((coord) => coord.trim());
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <Card className="recommendation-card shadow-lg">
      <CardMedia
        component="img"
        alt={places?.activity_name || "Activity Image"}
        height="140"
        image={imageSrc}
        onError={handleImageError}
        className="card-image"
      />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          className="activity-name flex justify-between gap-6"
        >
          {places.activity_name}{" "}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="google-maps-link"
          >
            <NearMeIcon />
          </a>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="activity-description"
        >
          {places.activity_description}
        </Typography>
        <Typography variant="body2" color="text.primary" className="pricing">
          <strong>Pricing: </strong> {places.pricing}
        </Typography>
        <Typography variant="body2" color="text.primary" className="location">
          <strong>Location: </strong> {places.location}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          className="place-address"
        >
          <strong>Address: </strong> {places.place_address}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
