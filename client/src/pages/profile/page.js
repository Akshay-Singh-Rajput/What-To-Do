import React, { useEffect, useState } from "react";
import { useAuth } from "../../app/context/AuthContext";
import { Box, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useRouter } from "next/router";

const Page = () => {
    const { user } = useAuth();
    const [ loading, setLoading ] = useState(true);
    const router = useRouter();


    const executeAfterDelay = (callback, delay = 3000) => {
        if (typeof callback !== 'function') {
            throw new Error('The first argument must be a function');
        }

        setTimeout(() => {
            callback();
        }, delay);
    };

    const checkAuthentication = () => {
        setLoading(false);
        if (!user?.token) {
            executeAfterDelay(() => (router.push('/')), 5000);
        }
    };

    useEffect(() => {
        if (!!user?.token) {
            setLoading(false);
        }
        executeAfterDelay(checkAuthentication);
    }, [ user ]);


    return (
        <div className="h-full flex flex-col justify-center items-center dark:bg-gray-900 bg-gray-100 dark:text-white text-gray-800">
            { loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            ) : user ? (
                <Typography variant="body1">
                    Welcome, { user.displayName } - you are logged in to the profile page - a protected route.
                </Typography>
            ) : (
                <Box margin="auto" className="text-center">
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Typography variant="h4" component="div">
                                        You must be logged in to view this page.
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Typography variant="h5" component="div">
                                        Tips: You can sign in with your Google account.
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Typography variant="h6" component="div">
                                        Redirecting you to home...
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </Box>
            ) }
        </div>
    );
};

export default Page;
