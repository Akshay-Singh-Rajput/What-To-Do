import Head from "next/head";
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";
import { NextSeo } from "next-seo";
import LandingPage from "../app/components/LandingPage";
import { Box, Container } from "@mui/material";
import { useAuth } from "../app/context/AuthContext";
import DemoCards from "./demoCards/DemoCards";
import PreviousActivities from "./user/PreviousActivities";

export default function Home() {
  const { user } = useAuth();

  let themeClass = 'dark:bg-gray-900 bg-gray-100 dark:text-white text-gray-800';
  return (
    <Box className="">
      <NextSeo
        title="Home: nine4"
        description="Welcome to nine4 homepage."
        canonical="https://nine4-3.vercel.app/"
        openGraph={ {
          url: "https://nine4-3.vercel.app/",
        } }
      />
      <Head>
        <title>What to do</title>
        <link rel="icon" href="../../public/favicon.png" />
        <script
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD55Jf-yj3s7jUla7VnaVSU6HyH2doHBWs&libraries=places`}
      />
      </Head>
      <Container maxWidth="lg" className="flex flex-col gap-0">
        {
          user ?
            <PreviousActivities />
            :
            <>
              <LandingPage />
              <Footer />
            </>
        }
      </Container>
    </Box>
  );
}



