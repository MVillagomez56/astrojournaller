import React from "react";
import BlogCard from "./BlogCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogDetail = () => {
  const id = useParams().id;
  console.log(id);
  const [blog, setBlog] = useState();

  const fetchBlog = async () => {
    const res = await axios
      .get(`https://vast-wave-30608.herokuapp.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchBlog().then((data) => setBlog(data.blog));
  }, []);

  console.log(blog);

  return (
    <div>
      {blog && (
        <BlogCard
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog.user._id}
          title={blog.title}
          content={blog.content}
          imageURL={blog.image}
          username={blog.user.name}
        />
      )}
    </div>
  );
};

export default BlogDetail;
