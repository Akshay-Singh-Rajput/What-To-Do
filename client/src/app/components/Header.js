import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SignInModal from "./SignInModal";
import ProfileBox from "./ProfileBox";
import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";
import { useThemeContext } from "../context/ThemeContext";
import { useGlobalContext } from "../context/GlobalContext";
import Loader from "./Loader";

export default function Header() {
  const [ navbarOpen, setNavbarOpen ] = useState(false);
  const { user, setUser, logOut } = useAuth();
  const { isLoading, isBottomSheetOpen, setIsBottomSheetOpen } =
    useGlobalContext();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isLargeScreen = useMediaQuery("(min-width: 960px)");
  const [ showSignInPopUp, setShowSignInPopUp ] = useState(false);

  const themeMode = useThemeContext();

  const handleSignOut = async () => {
    try {
      await logOut();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInClick = () => {
    setShowSignInPopUp(true);
  };

  const handleBottomSheetToggle = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
    setNavbarOpen(!navbarOpen);
  };
  useEffect(() => {
    const handleRouteChange = () => {
      setNavbarOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [ router ]);

  console.log(themeMode, "themeee");

  return (
    <AppBar position="sticky" className="navbar-height">
      <Toolbar className="justify-between gap-8">
        <Typography variant="h6" component="div">
          <Link
            href="/"
            className="flex text-3xl text-white font-medium md:mb-0"
          >
            { themeMode === "dark" ? (
              <img
                className="h-24 w-24"
                src="/What-light.png"
                alt="Dark Theme Logo"
              />
            ) : (
              <img
                className="h-24 w-24"
                src="/What__1_dark.png"
                alt="Light Theme Logo"
              />
            ) }
          </Link>
        </Typography>

        <Box
          className={ `flex items-center ${isLargeScreen ? "gap-8" : "gap-2"}` }
        >
          <Box className="flex gap-2 items-center">
            <ThemeToggle />
          </Box>
          { !isLargeScreen ? (
            <div className="h-[40px] w-[40px]">
              { user && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={ () => setNavbarOpen(!navbarOpen) }
                  className=" justify-end"
                >
                  <MenuIcon />
                </IconButton>
              ) }
            </div>
          ) : (
            <>
              { isLargeScreen && (
                <div className="hidden md:flex gap-8 justify-end items-center">
                  { user ? (
                    <>
                      <Typography onClick={ handleBottomSheetToggle }
                        variant="body1"
                        className="cursor-pointer font-semibold"
                      >
                        Plan Activity
                      </Typography>
                      <header
                        style={ {
                          display: "flex",
                          justifyContent: "flex-end",
                          padding: "16px",
                        } }
                      >
                        <ProfileBox />
                      </header>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="body1"
                        className="cursor-pointer font-semibold"
                        onClick={ handleSignInClick }
                      >
                        Sing In
                      </Typography>
                    </>
                  ) }
                </div>
              ) }
            </>
          ) }
          <Drawer
            anchor="right"
            open={ !isLargeScreen && navbarOpen }
            onClose={ () => setNavbarOpen(false) }
            sx={ {
              "& .MuiPaper-root": {
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: "0",
                width: "70%",
                height: "100dvh",
                padding: "12px",
              },
            } }
          >
            <List>
              { user ? (
                <>
                  <ListItem onClick={ handleBottomSheetToggle }>
                    <Typography
                      variant="body1"
                      className="cursor-pointer font-semibold"
                    >
                      Plan Activity
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <Link href="/user/PreviousActivities" passHref>
                      <Typography
                        variant="body1"
                        className="cursor-pointer font-semibold"
                      >
                        My Activities
                      </Typography>
                    </Link>
                  </ListItem>

                  {/* <ListItem>
                    <Link href="/profile/page" passHref>
                      <Typography
                        variant="body1"
                        className="cursor-pointer font-semibold"
                      >
                        Profile
                      </Typography>
                    </Link>
                  </ListItem> */}

                  <ListItem
                    button
                    onClick={ handleSignOut }
                    className="flex gap-2 font-semibold"
                  >
                    <LogoutIcon />
                    <ListItemText primary="Sign Out" />
                  </ListItem>
                </>
              ) : (
                <>
                  {/* <ListItem button>
                    <Link href="/login" passHref>
                      <ListItemText primary="Log In" />
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link href="/signup" passHref>
                      <ListItemText primary="Sign Up" />
                    </Link>
                  </ListItem> */}

                  <ListItem button onClick={ handleSignInClick }>
                    <Typography>
                      <ListItemText primary="Sign In" />
                    </Typography>
                  </ListItem>
                </>
              ) }
              {/* <ListItem button>
                <Link href="/profile/page" passHref>
                  <ListItemText primary="Profile" />
                </Link>
              </ListItem> */}
            </List>
          </Drawer>
        </Box>
      </Toolbar>

      <>
        { !user && (
          <SignInModal
            open={ showSignInPopUp }
            onClose={ () => setShowSignInPopUp(false) }
          />
        ) }
        <SwipeableEdgeDrawer
          open={ isBottomSheetOpen }
          setOpen={ setIsBottomSheetOpen }
        />

        { isLoading && (
          <div className="fixed w-full h-full flex justify-center items-center bg-[#0c0c0c66]">
            <Loader />
          </div>
        ) }
      </>
    </AppBar>
  );
}
