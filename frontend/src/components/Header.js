import React, { createContext, useState, useTransition } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions, themeActions } from "../store";
import { hasAccountActions } from "../store";
import { passwordActions, registerActions } from "../store";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const hasAccount = createContext(false);

const Header = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentTheme = localStorage.getItem("theme");

  // this is to stay logged in if refresh
  if (localStorage.getItem("userId")) {
    dispatch(authActions.login());
  }
  return (
    <AppBar
      style={{
        background:
          currentTheme === "light"
            ? "linear-gradient(0deg, rgba(3,0,45,1) 0%, rgba(10,27,93,1) 45%, rgba(5,109,157,1) 100%)"
            : "linear-gradient(180deg, rgba(3,0,45,1) 0%, rgba(10,27,93,1) 45%, rgba(5,109,157,1) 100%)",
      }}
      position="sticky"
    >
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <Typography
          variant="h6"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "white",
            textDecoration: "none",
          }}
        >
          astro journaller
        </Typography>
        </Link>

        {isLoggedIn && (
          <Box
            sx={{ flexGrow: 1 }}
            marginTop="auto"
            marginLeft={"5px"}
            marginBottom="0"
          >
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                LinkComponent={Link}
                to="/blogs"
                sx={{ padding: 2.4, borderRadius: 10 }}
                label="Home"
              />
              <Tab
                LinkComponent={Link}
                to="/myblogs"
                sx={{ padding: 2.4, borderRadius: 10 }}
                label="My Blogs"
              />
              <Tab
                LinkComponent={Link}
                to="/blogs/create"
                sx={{ padding: 2.4, borderRadius: 10 }}
                label="Create Blog"
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              {" "}
              <Button
                LinkComponent={Link}
                to="/auth"
                onClick={() => dispatch(hasAccountActions.yesAccount())}
                variant="contained"
                sx={{ marginRight: "10px", borderRadius: "5" }}
                margin="10"
                startIcon={<Login />}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                onClick={() => dispatch(hasAccountActions.noAccount())}
                variant="contained"
                sx={{ borderRadius: "5", marginRight: "10px" }}
              >
                Register
              </Button>
            </>
          )}
          {/* only show logout when logged in */}
          {isLoggedIn && (
            <Button
              LinkComponent={Link}
              to="/auth"
              onClick={() => (
                localStorage.removeItem("userId"),
                dispatch(authActions.logout()),
                dispatch(passwordActions.correctPassword()),
                dispatch(registerActions.goodRegister()),
                dispatch(hasAccountActions.yesAccount())
              )}
              variant="contained"
              startIcon={<Logout />}
              sx={{ borderRadius: "5" }}
            >
              Logout
            </Button>
          )}
          <IconButton
            onClick={() => (
              dispatch(themeActions.toggleTheme()),
              localStorage.setItem("theme", localStorage.getItem("theme")==="light" ? "dark" : "light"),
              console.log(localStorage.getItem("theme"))

            )}
            sx={{ color: "white" }}
          >
            {currentTheme === "dark" ? (
              <Brightness4Icon />
            ) : (
              <Brightness7Icon />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
