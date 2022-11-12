import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { hasAccountActions } from "../store";
import { useSelector } from "react-redux";
import { Alert, AlertTitle } from "@mui/material";
import { passwordActions, registerActions } from "../store";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = useSelector((state) => state.register.register);
  const incorrectPassword = useSelector((state) => state.password.password);
  const hasAccount = useSelector((state) => state.hasAccount.hasAccount);

  /* so e.target targets the textfield, and then the name attribute of the textfield is the key of the object, and the value is the value of the textfield */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const sendRequest = async (type = "login") => {
    let res;
    try {
      const response = await axios.post(
        `https://vast-wave-30608.herokuapp.com/api/user/${type}`,
        { name: inputs.name, email: inputs.email, password: inputs.password }
      );
      console.log("test");
      console.log(response);
      res = response;
    } catch (err) {
      console.log(err);
      res = "error";
    }
    console.log(res);
    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (hasAccount) {
      console.log("login");
      sendRequest().then((res) => {
        if (res !== "error") {
          localStorage.setItem("userId", res.data.user._id);
          console.log("login successful");
          dispatch(authActions.login());
          navigate("/blogs");
          console.log("logged in");
        } else {
          dispatch(passwordActions.incorrectPassword());
          console.log("error");
        }
      });
    } else {
      console.log("register");
      sendRequest("signup")
        .then((res) => {
          if (res !== "error") {
            localStorage.setItem("userId", res.data.newUser._id);
            console.log("register successful");
            dispatch(authActions.login());
            navigate("/blogs");
            console.log("logged in");
          } else {
            dispatch(registerActions.badRegister());
            console.log("error");
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        width="50%"
        boxShadow={"10px 10px 20px rgba(0,0,0,0.5)"}
        padding={"60px"}
        borderRadius={"10px"}
        margin={"auto"}
        marginTop={"10%"}
      >
        {incorrectPassword && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Your password or username was incorrect, please retry!
          </Alert>
        )}
        {register && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Sorry, please try a different email!
          </Alert>
        )}
        <Typography variant="h4" align="center">
          {hasAccount ? "Login" : "Register"}
        </Typography>
        {!hasAccount && (
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            margin="normal"
            label="Username"
            variant="outlined"
          />
        )}{" "}
        <TextField
          onChange={handleChange}
          name="email"
          value={inputs.email}
          type={"email"}
          margin="normal"
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          name="password"
          value={inputs.password}
          type={"password"}
          margin="normal"
          label="Password"
          variant="outlined"
        />
        <Button
          type="submit"
          sx={{ margin: "5px 0 5px" }}
          size="large"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <Button
          onClick={() => (
            dispatch(hasAccountActions.toggleAccount()),
            dispatch(passwordActions.correctPassword())
          )}
          sx={{ fontSize: 10, margin: "5px 0 5px" }}
        >
          {hasAccount
            ? " Don't have an account? Sign up!"
            : "Already have an account? Sign in!"}
        </Button>
      </Box>
    </form>
  );
};

export default Auth;
