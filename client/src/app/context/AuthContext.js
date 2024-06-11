import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useRouter } from "next/router";
import { usePathname } from 'next/navigation';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ pathname, setPathname ] = useState('');

    const router = useRouter();

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .catch((error) => {
                if (error.code === 'auth/popup-closed-by-user') {
                    console.log('Sign-in popup was closed by the user.');
                } else {
                    console.error('Error signing in with Google:', error);
                }
            });
    };

    const logOut = () => {
        signOut(auth);
    };

    const handleGoogleSignIn = (idToken) => {
        axios.post('/auth/google', { idToken: idToken }, {
            headers: {
                "accepts": "application/json",
            }
        }).then(response => {
            setUser(response.data);
            if ([ "/", "/login", "/signup" ].includes(pathname)) {
                router.push('/');
            }
        }).catch(error => {

        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                currentUser.getIdToken().then((idToken) => {
                    handleGoogleSignIn(idToken);
                });
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setPathname(router.pathname);
    }, [ router.pathname ]);

    return (
        <AuthContext.Provider value={ { user, setUser, googleSignIn, logOut } }>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
