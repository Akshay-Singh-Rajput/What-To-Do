import React, { useState } from 'react';
import { Dialog, IconButton, Typography, Card, CardContent, CircularProgress, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Google } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthContext';

const PaperStyled = styled('div')(({ theme }) => ({
    backgroundColor: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
}));

const CardStyled = styled(Card)(({ theme }) => ({
    maxWidth: 500,
    margin: 'auto',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    position: 'relative',
}));

const SignInButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
}));

const SignInModal = ({ open, onClose }) => {
    const [ loading, setLoading ] = useState(false);
    const { user, googleSignIn, logOut } = useAuth();

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await googleSignIn();
        } catch (error) {
            console.error('Sign In Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={ open } onClose={ onClose } PaperComponent={ PaperStyled } fullWidth maxWidth="sm">
            <CardStyled>
                <IconButton
                    onClick={ onClose }
                    color="inherit"
                    edge="end"
                    aria-label="close"
                    style={ { position: 'absolute', top: 8, right: 8 } }
                >
                    <CloseIcon />
                </IconButton>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Sign in with Google
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                        To access exclusive features, please sign in with your Google account.
                    </Typography>
                    <Divider sx={ { my: 2 } } />
                    <SignInButton
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={ handleGoogleSignIn }
                        disabled={ loading }
                        startIcon={ <Google /> }
                    >
                        { loading ? (
                            <CircularProgress size={ 24 } />
                        ) : (
                            'Sign in with Google'
                        ) }
                    </SignInButton>
                </CardContent>
            </CardStyled>
        </Dialog>
    );
};

export default SignInModal;
