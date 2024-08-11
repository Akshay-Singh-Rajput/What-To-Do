import RootLayout from "../app/components/RootLayout";
import axios from "axios";
import { ThemeContextProvider } from "../app/context/ThemeContext";
import { useEffect } from "react";
import { checkBackendHealth } from "../app/utils/apiHealthCheck";

function MyApp({ Component, pageProps }) {

  const localUrl = "http://localhost:5000";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const isProduction = process.env.NODE_ENV === 'production';
  axios.defaults.baseURL = isProduction ? apiUrl : localUrl;

  useEffect(() => {
    checkBackendHealth();
  }, []);

  return (
    <ThemeContextProvider>
      <RootLayout >
        <Component { ...pageProps } />
      </RootLayout>
    </ThemeContextProvider>
  );

}

export default MyApp;
