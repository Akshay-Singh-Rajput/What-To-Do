import Head from "next/head";
import Header from "../app/components/Header";
import Main from "../app/components/Main";
import Footer from "../app/components/Footer";
import { NextSeo } from "next-seo";
import LandingPage from "../app/components/LandingPage";
import { Box, Container } from "@mui/material";

export default function Home() {
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
      </Head>
      {/* <Main /> */ }
      <Container maxWidth="lg" className="flex flex-col gap-0">
        <LandingPage />
        <Footer />
      </Container>
    </Box>
  );
}



