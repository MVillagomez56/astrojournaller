import "./App.css";
import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import UserBlogs from "./components/UserBlogs";
import BlogEdit from "./components/BlogEdit";
import CreateBlog from "./components/CreateBlog";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import BlogDetail from "./components/BlogDetail";
import { themeActions } from "./store";


function App() {
  

const mode=useSelector((state)=>state.theme.theme)  
const theme={
  palette: {
    mode: mode,
  }
};

const Theme = createTheme(theme);

  const dispatch= useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      console.log("login successful");
      dispatch(authActions.login());
    }
  },[dispatch]);


  useEffect(()=>{
    if(localStorage.getItem("theme")){
      dispatch(themeActions.setTheme())
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            {/* making the routes */}
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Blogs />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/blogs" element={<Blogs />} />
                <Route path="/myblogs" element={<UserBlogs />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
                <Route path="/blogs/edit/:id" element={<BlogEdit />} />
                <Route path="/blogs/create" element={<CreateBlog />} />
                </>
            ) : (
              <>
                <Route path="/" element={<Blogs />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
              </>
            )}
          </Routes>
        </main>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
