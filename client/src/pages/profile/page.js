import React, { useEffect, useState } from "react";
import { useAuth } from "../../app/context/AuthContext";
import { Typography } from '@mui/material';

const Page = () => {
    const { user } = useAuth();
    const [ loading, setLoading ] = useState(true);

    const checkAuthentication = () => {
        setLoading(false);
    };

    useEffect(() => {
        checkAuthentication();
    }, [ user ]);

    return (
        <div className="h-full flex flex-col justify-center items-center dark:bg-gray-900 bg-gray-100 dark:text-white text-gray-800">
            { loading ? (
                'Loading...'
            ) : user ? (
                <Typography variant="body1">
                    Welcome, { user.displayName } - you are logged in to the profile page - a protected route.
                </Typography>
            ) : (
                <Typography variant="body1">
                    You must be logged in to view this page - protected route.
                </Typography>
            ) }
        </div>
    );
};

export default Page;
