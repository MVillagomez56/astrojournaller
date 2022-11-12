import { InputLabel, TextField, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    imageURL: " ",
  });

  const navigate = useNavigate();

  const sendRequest = async () => {
    let res;
    try {
      res = await axios.post(
        "https://vast-wave-30608.herokuapp.com/api/blog/create",
        {
          title: inputs.title,
          content: inputs.content,
          image: inputs.imageURL,
          user: localStorage.getItem("userId"),
        }
      );
    } catch (err) {
      console.log(err);
    }
    const data = await res.data;
    console.log(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then(() => navigate("/myblogs"))
      .then(() => window.location.reload())
      .then((data) => console.log(data));
    navigate("/blogs");
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ margin: "20px" }}>
            Compose a new blog
          </Typography>
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
    </div>
  );
};

export default CreateBlog;
