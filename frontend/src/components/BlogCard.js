import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CardMedia,
  Typography,
  Grid,
  Box,
  IconButton,
  CardActionArea,
} from "@mui/material";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogCard = ({ title, content, imageURL, username, isUser, id }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    console.log("edit");
    e.stopPropagation();
    navigate(`/blogs/edit/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`https://vast-wave-30608.herokuapp.com/api/blog/delete/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleDelete = (e) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteRequest()
        .then(() => navigate("/myblogs"))
        .then(() => window.location.reload())
        .then((data) => console.log(data));
    }
  };

  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }
  console.log(title, isUser);
  return (
    <Grid item lg={4} sm={6} xs={12}>
      <Card
        sx={{
          width: "95%",
          margin: "auto",
          alignItems: "center",
          mt: 2,
          padding: 2,
          mb: 5,
          boxShadow: "5px 5px 10px 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          ":hover": {
            filter: "brightness(1.1)",
            boxShadow: "10px 10px 20px 10px rgba(0,0,0,0.4)",
          },
        }}
      >
        <Link
          to={
            `/blogs/${id}` === window.location.pathname
              ? undefined
              : `/blogs/${id}`
          }
          style={{ textDecoration: "none" }}
        >
          <Grid container justifyContent={"space-between"}>
            <CardHeader
              avatar={<Avatar aria-label="recipe">{username[0]}</Avatar>}
              title={title}
            />
            {isUser && (
              <Box display="flex" sx={{ marginTop: "15px", height: "60%" }}>
                <Link
                  to={`/blogs/edit/${id}`}
                  style={{ textDecoration: "none" }}
                >
                  <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                    <ModeEditOutlineTwoToneIcon />
                  </IconButton>
                </Link>

                <IconButton onClick={handleDelete}>
                  <DeleteTwoToneIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          {""}
          {validURL(imageURL) && (
            <CardMedia
              component="img"
              height="194"
              image={imageURL}
              alt="Image"
            />
          )}
          <CardContent>
            <Typography
              sx={{ whiteSpace: "break-spaces" }}
              variant="body2"
              color="text.secondary"
            >
              {content}
              <br />
              {"By "}
              <b>{username}</b>
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};

export default BlogCard;
