import RootLayout from "../app/components/RootLayout";

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout >
      <Component { ...pageProps } />
    </RootLayout>
  );

}

export default MyApp;
