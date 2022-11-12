import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard.js";
import { Grid, Typography } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get("https://vast-wave-30608.herokuapp.com/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
    console.log(blogs);
  }, []);
  

  return (
    <div style={{margin:"0 20px 0 20px"}}>
      <Typography variant="h4" align="center" sx={{ margin: "20px" }}>
        All Blogs
      </Typography>
      <Grid container rowSpacing={0} flex="true">
        {blogs &&
          blogs.map((blog) => {
            return (
              <BlogCard
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog.user._id}
                title={blog.title}
                content={blog.content}
                imageURL={blog.image}
                username={blog.user.name}
              />
            );
          })}
      </Grid>
    </div>
  );
};

export default Blogs;
