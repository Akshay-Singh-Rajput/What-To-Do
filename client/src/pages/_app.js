import RootLayout from "../app/components/RootLayout";
import axios from "axios";
import { ThemeContextProvider } from "../app/context/ThemeContext";

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = 'http://localhost:5000';

  return (
      <ThemeContextProvider>
        <RootLayout >
          <Component { ...pageProps } />
        </RootLayout>
      </ThemeContextProvider>
  );

}

export default MyApp;
