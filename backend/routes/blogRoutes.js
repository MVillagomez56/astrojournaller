import express  from "express";
import { getAllBlogs, createBlog, updateBlog, deleteBlog, getUserBlogs, getBlogById} from "../controllers/blogControllers.js";
const blogRouter=express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.get("/:id",getBlogById);
blogRouter.get("/user/:id",getUserBlogs);
blogRouter.post("/create",createBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.delete("/delete/:id",deleteBlog);

//i mean hey this counts as a crud app right?
//im so scared of deployment ;-;

export default blogRouter;