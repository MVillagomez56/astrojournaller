import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard.js";
import { Grid, Typography } from "@mui/material";

const UserBlogs = () => {
  const [user, setUser] = useState();

  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios
      .get(`https://vast-wave-30608.herokuapp.com/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.userBlogs));
  }, []);

  // user.blogs.map((blog) => {
  //   return(    console.log(blog)
  //   )
  // });

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ margin:"20px" }}>
        Your Blogs
      </Typography>
      <Grid container rowSpacing={0}>
        {user &&
          user.blogs &&
          user.blogs.map((blog) => {
            return (
              <BlogCard
                id={blog._id}
                isUser={true}
                title={blog.title}
                content={blog.content}
                imageURL={blog.image}
                username={user.name}
              />
            );
          })}
      </Grid>
    </div>
  );
};

export default UserBlogs;
