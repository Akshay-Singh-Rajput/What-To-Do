import { useState } from 'react';
import { Menu, MenuItem, IconButton, Tooltip, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';


const ProfileBox = () => {
    const { user, setUser, logOut } = useAuth();
    const [ anchorEl, setAnchorEl ] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        try {
            await logOut();
            setUser(null);
            router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    };

    const getInitials = (fullName) => {
        if (!fullName) return '';

        const nameParts = fullName.trim().split(/\s+/);
        const firstInitial = nameParts[ 0 ][ 0 ].toUpperCase();
        const lastInitial = nameParts[ nameParts.length - 1 ][ 0 ].toUpperCase();

        if (nameParts.length === 1) {
            return firstInitial;
        }

        return firstInitial + lastInitial;
    }
    return (
        <>
            <Tooltip title="Profile">
                <IconButton
                    aria-controls="profile-menu"
                    aria-haspopup="true"
                    onClick={ handleClick }
                    sx={ {
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: '#005bb5',
                        },
                    } }
                >
                    { getInitials(user?.displayName) }
                </IconButton>
            </Tooltip>
            <Menu
                id="profile-menu"
                anchorEl={ anchorEl }
                open={ Boolean(anchorEl) }
                onClose={ handleClose }
                PaperProps={ {
                    sx: {
                        maxWidth: 200,
                    },
                } }
            >
                <MenuItem onClick={ handleClose }>
                    <Link href="/profile/Home" passHref>
                        <Typography variant="body1" className="cursor-pointer text-white font-semibold">My Trip</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={ handleClose }>
                    <Link href="/profile/page" passHref>
                        <Typography variant="body1" className="cursor-pointer text-white font-semibold">Profile</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={ handleSignOut }>Sign out</MenuItem>
            </Menu>
        </>
    );
};

export default ProfileBox;
