const apiKey = "AIzaSyD55Jf-yj3s7jUla7VnaVSU6HyH2doHBWs"; // Replace with your actual API key

// Function to get Place ID by Place Name
async function getPlaceIdByPlaceName(name = "Delhi") {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let res = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&key=${apiKey}`,
    requestOptions
  );

  let resJson = await res.json();

  if (resJson.status === "OK") {
    return resJson.candidates[0].place_id;
  } else {
    throw new Error("Place ID not found");
  }
}

// Function to get Place Reference by Place ID
async function getPlaceReferenceByPlaceId(placeId) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`,
    requestOptions
  );

  let resJson = await response.json();

  if (
    resJson.status === "OK" &&
    resJson.result.photos &&
    resJson.result.photos.length > 0
  ) {
    return resJson.result.photos[0].photo_reference;
  } else {
    throw new Error("Photo reference not found");
  }
}

// Function to get Place Photo URL by Photo Reference
async function getPlacePhotoByPhotoRef(photoReference) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&sensor=false&maxheight=400&maxwidth=800&key=${apiKey}`
  );

  if (response.ok) {
    return response.url; // Return the URL of the image
  } else {
    throw new Error("Failed to fetch photo");
  }
}

// Main function to get the photo URL by place name
async function getPlacePhotoUrl(placeName = "Delhi") {
  try {
    const placeId = await getPlaceIdByPlaceName(placeName);
    const photoReference = await getPlaceReferenceByPlaceId(placeId);
    const photoUrl = await getPlacePhotoByPhotoRef(photoReference);
    return photoUrl;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

// // Example usage
// getPlacePhotoUrl("Gateway of India").then((photoUrl) => {
//   console.log("Photo URL:", photoUrl);
// });

async function updateContentWithPhotoUrls(content) {
    for (let place of content) {
      try {
        const photoUrl = await getPlacePhotoUrl(place.place_address);
        place.activity_image = photoUrl;
        // console.log(`Updated ${place.place_address} with Photo URL:`, photoUrl);
      } catch (error) {
        console.error(`Error updating ${place.place_address}:`, error.message);
      }
    }
    return content;
  }
  


module.exports = { updateContentWithPhotoUrls };
