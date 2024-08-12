import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Header from "./Header";
import { GlobalProvider } from "../context/GlobalContext";

export default function RootLayout({ children }) {
  return (
    <div>
      <AuthContextProvider>
        <GlobalProvider>
          <Header />
          <div className="page-layout-wrapper">
            {children}
          </div>
        </GlobalProvider>
      </AuthContextProvider>
    </div>
  );
}
