import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Header from "./Header";


export default function RootLayout({ children }) {
    return (
        <div>
            <AuthContextProvider>
                <Header />
                <div className="page-layout-wrapper">
                { children }
                </div>
            </AuthContextProvider>
        </div>
    );
}