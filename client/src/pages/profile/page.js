import React, { useEffect, useState } from "react";
import { useAuth } from "../../app/context/AuthContext";

const page = () => {
    const { user } = useAuth();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [ user ]);

    return (
        <div className="min-h-screen m-auto flex flex-col justify-center items-center text-gray-300 hover:text-white font-semibold tr04">
            { loading ? (
               'loading...'
            ) : user ? (
                <p>
                    Welcome, { user.displayName } - you are logged in to the profile page -
                    a protected route.
                </p>
            ) : (
                <p>You must be logged in to view this page - protected route.</p>
            ) }
        </div>
    );
};

export default page;