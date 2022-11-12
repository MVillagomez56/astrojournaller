import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogEdit = () => {
  const id = useParams().id;
  console.log(id);
  const navigate=useNavigate();

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const [blog, setBlog] = useState();

  const fetchBlog = async () => {
    const res = await axios
      .get(`https://vast-wave-30608.herokuapp.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  
  const sendRequest = async () => {
    const res= await axios.put(`https://vast-wave-30608.herokuapp.com/api/blog/update/${id}`, {
      title: inputs.title,
      content: inputs.content,
      image: inputs.imageURL
    }).catch(err => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data => console.log(data));
    navigate("/myblogs");
  };


  useEffect(() => {
    fetchBlog().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        content: data.blog.content,
        imageURL: data.blog.image,
      });
    });
  }, [id]);
  console.log(blog);

  return (
    <div>
      {inputs && 
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          width="50%"
          boxShadow={"10px 10px 20px rgba(0,0,0,0.5)"}
          padding={"10px 60px 60px 60px"}
          borderRadius={"10px"}
          margin={"auto"}
          marginTop={"30px"}
        >
          <Typography variant="h5" paddingBottom={4} margin={"5px auto 10px"}>
            Edit your blog
          </Typography>

          <TextField
            onChange={handleChange}
            name="title"
            value={inputs.title}
            type={"title"}
            id="outlined-basic"
            label="Title"
            sx={{ width: "60%", paddingBottom: "20px" }}
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            name="content"
            value={inputs.content}
            type={"content"}
            id="outlined-multiline-static"
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            sx={{ paddingBottom: "20px" }}
          />
          <TextField
            onChange={handleChange}
            name="imageURL"
            value={inputs.imageURL}
            type={"imageURL"}
            label="Image URL"
          />
          <Button
            type="submit"
            size="large"
            sx={{ width: "25%", margin: "20px auto 10px" }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </form>
      }
    </div>
  );
};

export default BlogEdit;
