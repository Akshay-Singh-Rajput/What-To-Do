import Head from "next/head";
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";
import { NextSeo } from "next-seo";
import LandingPage from "../app/components/LandingPage";
import { Box, Container } from "@mui/material";
import { useAuth } from "../app/context/AuthContext";
import PreviousActivities from "./user/PreviousActivities";
import Script from "next/script";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  let themeClass = "dark:bg-gray-900 bg-gray-100 dark:text-white text-gray-800";

  const initMap = () => {
    // Check if the google object is available
    if (typeof google !== "undefined" && google.maps) {
      // const map = new google.maps.Map(document.getElementById("map"), {
      //   center: { lat: -34.397, lng: 150.644 },
      //   zoom: 8,
      // });
    } else {
      console.error("Google Maps API not loaded");
    }
  };

  useEffect(() => {
    // Initialize the map when the script has been loaded
    if (typeof google !== "undefined" && google.maps) {
      initMap();
    }
  }, []);

  return (
    <Box className={themeClass}>
      <NextSeo
        title="Wtd"
        description="Welcome to wt."
        canonical="https://nine4-3.vercel.app/"
      />
      <Head>
        <title>What to do</title>
        <link rel="icon" href="../../public/favicon.png" />
      </Head>
      <Script
        id="google-maps-script"
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD55Jf-yj3s7jUla7VnaVSU6HyH2doHBWs&libraries=places&v=weekly`}
        onLoad={() => {
          initMap();
        }}
      />
      <Container maxWidth="lg" className="flex flex-col gap-0">
        {/* <div id="map" style={{ height: "400px", width: "100%" }}></div> */}
        {user ? (
          <PreviousActivities />
        ) : (
          <>
            <LandingPage />
            <Footer />
          </>
        )}
      </Container>
    </Box>
  );
}
