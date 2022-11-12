import { NoAccounts } from "@mui/icons-material";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

const hasAccountSlice = createSlice({
  name: "hasAccount",
  initialState: {
    hasAccount: true,
  },
  reducers: {
    toggleAccount(state) {
      state.hasAccount = !state.hasAccount;
    },
    yesAccount(state) {
      state.hasAccount = true;
    },
    noAccount(state) {
      state.hasAccount = false;
    },
  },
});

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    password: false,
  },
  reducers: {
    incorrectPassword(state) {
      state.password = true;
    },
    correctPassword(state) {
      state.password = false;
    },
  },
});

const registerSlice = createSlice({
  name: "register",
  initialState: {
    register: false,
  },
  reducers: {
    badRegister(state) {
      state.register = true;
    },
    goodRegister(state) {
      state.register = false;
    },
  },
});

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage.getItem("theme") || "light",
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme(state){
      state.theme = localStorage.getItem("theme");
    }
  },
});

export const themeActions = themeSlice.actions;
export const registerActions = registerSlice.actions;
export const passwordActions = passwordSlice.actions;
export const hasAccountActions = hasAccountSlice.actions;

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    hasAccount: hasAccountSlice.reducer,
    password: passwordSlice.reducer,
    register: registerSlice.reducer,
    theme: themeSlice.reducer,
  },
});
