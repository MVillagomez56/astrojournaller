import Blog from "../dbmodels/Blog.js";
import User from "../dbmodels/User.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res) => {
    let blogs;
    //if there is no id in the url, return all blogs
    try {
        blogs = await Blog.find().populate("user");
    } catch (error) {
        return console.log(error);
    }
    if (!blogs) {
        return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({blogs});
}

export const getBlogById = async (req, res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id).populate("user");
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(404).json({ message: "No blog found" });
    }
    return res.status(200).json({blog});
}

//get all blogs by user
export const getUserBlogs = async (req, res) => {
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs");
    } catch(err){
        return console.log(err);
    }
    //if no blogs are found, return an error
    if (!userBlogs || userBlogs.blogs.length===0){
        return res.status(404).json({message:"No blogs found for user"})
    }
    return res.status(200).json({userBlogs});
}
    

//make a new blog
export const createBlog=async (req,res)=>{
    const {title,content,image,user}=req.body;
    let existingUser;
    try{
        existingUser= await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser){
        return res.status(404).json({message:"User not found"});
    }

    const newBlog=new Blog({
        title, 
        content,
        image,
        user
    });
    try{
        const session=await mongoose.startSession();
        //session is a mongoose method that allows us to make multiple changes to the database in one go
        session.startTransaction();
        //transaction is a way to make sure that if one of the saves fails, the other one is not saved
        //save the  new blog to the blogs collection
        await newBlog.save({session});
        //save new blog to existing users blogs
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        //commit the changes
        await session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({newBlog});
}

//update a blog
export const updateBlog=async (req,res)=>{
    const {title,content, image}=req.body;
    const blogId=req.params.id;
    let blog;
    try{
        blog=await Blog.findByIdAndUpdate(blogId,
            {
                title,
                content,
                image
            });
    }catch(error){
        return console.log(error);
    }
    return res.status(200).json({blog});
}

//delete a blog
export const deleteBlog=async (req, res)=>{
    const blogId=req.params.id;
    let blog;
    try{
        //Populate is a mongoose method that allows us to get the user who created the blog
        blog=await Blog.findByIdAndRemove(blogId).populate("user");
        //remove the blog from the users blogs
        await blog.user.blogs.pull(blog);
        //remove from the blogs collection
        blog.user.save();
    }catch(error){
        return console.log(error);
    }
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({message:"Blog successfully deleted"})
}