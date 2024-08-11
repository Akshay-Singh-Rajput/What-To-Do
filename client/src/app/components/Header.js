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

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { user, setUser, logOut } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isLargeScreen = useMediaQuery("(min-width: 960px)");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showSignInPopUp, setShowSignInPopUp] = useState(false);

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
    setIsOpenModal(!isOpenModal);
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
  }, [router]);

  console.log(themeMode, "themeee");

  return (
    <AppBar position="sticky" className="navbar-height">
      <Toolbar className="justify-between gap-8">
        <Typography variant="h6" component="div">
          <Link
            href="/"
            className="flex text-3xl text-white font-medium md:mb-0"
          >
            {themeMode === "dark" ? (
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
            )}
          </Link>
        </Typography>

        <Box
          className={`flex items-center ${isLargeScreen ? "gap-8" : "gap-2"}`}
        >
          <Box className="flex gap-2 items-center">
            <ThemeToggle />
            {/* <Link href="https://github.com/Akshay-Singh-Rajput/What-To-Do" target="_blank" rel="noopener noreferrer" className="hidden md:block">
              <svg width="30" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="GitHub logo" className="github-link--logo">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.3019 0C5.50526 0 0 5.50526 0 12.3019C0 17.7392 3.52669 22.3458 8.4127 23.977C9.0244 24.0902 9.25095 23.7126 9.25095 23.3804C9.25095 23.0858 9.2434 22.3156 9.23585 21.2885C5.81488 22.0286 5.08991 19.6422 5.08991 19.6422C4.53108 18.2225 3.72304 17.8373 3.72304 17.8373C2.60537 17.0746 3.80611 17.0897 3.80611 17.0897C5.03705 17.1803 5.69405 18.3584 5.69405 18.3584C6.78906 20.2388 8.57129 19.6951 9.27361 19.3779C9.38688 18.585 9.70406 18.0412 10.0514 17.7316C7.32524 17.4295 4.45556 16.3723 4.45556 11.66C4.45556 10.3158 4.93132 9.22074 5.72426 8.35984C5.59588 8.04266 5.17298 6.79662 5.83754 5.10501C5.83754 5.10501 6.87213 4.77274 9.22074 6.36616C10.2025 6.0943 11.2522 5.95837 12.3019 5.95082C13.344 5.95837 14.4013 6.0943 15.383 6.36616C17.7316 4.77274 18.7662 5.10501 18.7662 5.10501C19.4383 6.79662 19.0154 8.05021 18.887 8.35984C19.6724 9.22074 20.1482 10.3158 20.1482 11.66C20.1482 16.3874 17.271 17.422 14.5297 17.7316C14.9677 18.1092 15.3679 18.8644 15.3679 20.0123C15.3679 21.6586 15.3528 22.9801 15.3528 23.3879C15.3528 23.7202 15.5718 24.0978 16.1986 23.977C21.0846 22.3458 24.6038 17.7392 24.6038 12.3094C24.6038 5.50526 19.0985 0 12.3019 0Z" fill="white"></path>
              </svg>
            </Link> */}
          </Box>
          {!isLargeScreen ? (
            user && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setNavbarOpen(!navbarOpen)}
                className=" justify-end"
              >
                <MenuIcon />
              </IconButton>
            )
          ) : (
            <>
              {isLargeScreen && (
                <div className="hidden md:flex gap-8 justify-end items-center">
                  {user ? (
                    <>
                      <Link href="/suggestion/page" passHref>
                        <Typography
                          variant="body1"
                          className="cursor-pointer font-semibold"
                        >
                          Plan Activity
                        </Typography>
                      </Link>
                      <header
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          padding: "16px",
                        }}
                      >
                        <ProfileBox />
                      </header>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="body1"
                        className="cursor-pointer font-semibold"
                        onClick={handleSignInClick}
                      >
                        Sing In
                      </Typography>
                    </>
                  )}
                </div>
              )}
            </>
          )}
          <Drawer
            anchor="right"
            open={!isLargeScreen && navbarOpen}
            onClose={() => setNavbarOpen(false)}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: "0",
                width: "70%",
                height: "100dvh",
              },
            }}
          >
            <List>
              {user ? (
                <>
                  <ListItem onClick={handleBottomSheetToggle}>
                    <Typography
                      variant="body1"
                      className="cursor-pointer font-semibold"
                    >
                      Plan Activity
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <Link href="/profile/Home" passHref>
                      <Typography
                        variant="body1"
                        className="cursor-pointer font-semibold"
                      >
                        My Activities
                      </Typography>
                    </Link>
                  </ListItem>

                  <ListItem>
                    <Link href="/profile/page" passHref>
                      <Typography
                        variant="body1"
                        className="cursor-pointer font-semibold"
                      >
                        Profile
                      </Typography>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="/demoCards/DemoCards" passHref>
                      <Typography
                        variant="body1"
                        className="cursor-pointer font-semibold"
                      >
                        DemoCards
                      </Typography>
                    </Link>
                  </ListItem>

                  <ListItem
                    button
                    onClick={handleSignOut}
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

                  <ListItem button onClick={handleSignInClick}>
                    <Typography>
                      <ListItemText primary="Sign In" />
                    </Typography>
                  </ListItem>
                </>
              )}
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
        {!user && (
          <SignInModal
            open={showSignInPopUp}
            onClose={() => setShowSignInPopUp(false)}
          />
        )}
        <SwipeableEdgeDrawer open={isOpenModal} setOpen={setIsOpenModal} />
      </>
    </AppBar>
  );
}
