import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TypingEffect from '../../app/components/TypingEffect';
import { useAuth } from '../../app/context/AuthContext';
import { Button, TextField, Box, Typography, CircularProgress, List, ListItemText, ListItem } from '@mui/material';
import { useRouter } from 'next/router';

const Page = () => {
    const { user } = useAuth();
    const [ messages, setMessages ] = useState([]);
    const [ input, setInput ] = useState('');
    const [ isTyping, setIsTyping ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ isTypingCompleted, setIsTypingCompleted ] = useState(true);
    const messagesEndRef = useRef(null);
    const router = useRouter();

    const handleSendMessage = () => {
        if (input.trim() === '' || !isTypingCompleted) return;
        setIsTypingCompleted(false);
        setMessages((prevMessages) => [ ...prevMessages, { sender: 'user', text: input } ]);
        setInput('');
        getSuggestion();
    };

    const getSuggestion = () => {
        setIsTyping(true);
        axios
            .post(
                '/ai/suggestions',
                { prompt: input },
                {
                    headers: {
                        accepts: 'application/json',
                        Authorization: `Bearer ${user?.token}`,
                    }
                }
            )
            .then((response) => {
                const promptResp = response.data.content;
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'model', text: promptResp },
                ]);
                setIsTyping(false);
            })
            .catch((error) => {
                setIsTyping(false);
                console.error('Error:', error);
            });
    };

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
            executeAfterDelay(() => router.push('/'), 5000);
        }
    };

    useEffect(() => {
        if (!!user?.token) {
            setLoading(false);
        } else {
            executeAfterDelay(checkAuthentication);
        }
    }, [ user ]);


    const handleTypingComplete = () => {
        setIsTypingCompleted(true);
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <Fragment>
            <Box
                className="h-full w-full p-10"
                sx={ {
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'black' : 'white'),
                    color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'),
                } }
            >
                <Typography variant='h4' className='text-center mb-4'>
                    Interactive Chat: Communicate with Our AI Assistant
                </Typography>
                <Box
                    className="w-full h-[90%] flex flex-col max-w-[60%] mx-auto p-4 border border-gray-300 rounded-xl"
                >
                    { loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <CircularProgress />
                        </Box>
                    ) : user ? (
                        <Fragment>
                            <Box className="flex-1 overflow-y-auto mb-4 pr-4">
                                { messages.map((message, index) => (
                                    <Box
                                        key={ index }
                                        className={ `flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}` }
                                    >
                                        <Box
                                            className="max-w-[90%] rounded-lg py-2 px-4 my-1"
                                            sx={ {
                                                backgroundColor:
                                                    message.sender === 'user'
                                                        ? 'primary.main'
                                                        : 'grey.200',
                                                color: message.sender === 'user' ? 'white' : 'black',
                                                textAlign: message.sender === 'user' ? 'right' : 'left',
                                            } }
                                        >
                                            { message.sender === 'user' ? (
                                                message.text
                                            ) : (
                                                <TypingEffect
                                                    text={ message.text }
                                                    onTypingComplete={ handleTypingComplete }
                                                />
                                            ) }
                                        </Box>
                                    </Box>
                                )) }
                                { isTyping && (
                                    <Box className="max-w-xs bg-gray-200 text-black rounded-lg p-2 my-1 self-start">
                                        <TypingEffect text="..." />
                                    </Box>
                                ) }
                                <div ref={ messagesEndRef } />
                            </Box>
                            <Box className="flex items-end">
                                <TextField
                                    type="text"
                                    value={ input }
                                    onChange={ (e) => setInput(e.target.value) }
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Type a message..."
                                    className="mr-2"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={ handleSendMessage }
                                    disabled={ !isTypingCompleted }
                                >
                                    Send
                                </Button>
                            </Box>
                        </Fragment>
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
                </Box>
            </Box>
        </Fragment>
    );
};

export default Page;
