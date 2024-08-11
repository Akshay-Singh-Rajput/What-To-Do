import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Header from "./Header";
import { ActivitiesProvider } from "../context/ActivitiesContext";


export default function RootLayout({ children }) {
    return (
        <div>
            <AuthContextProvider>
                <ActivitiesProvider>
                    <Header />
                    <div className="page-layout-wrapper">
                        { children }
                    </div>
                </ActivitiesProvider>
            </AuthContextProvider>
        </div>
    );
}