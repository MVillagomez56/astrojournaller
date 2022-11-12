import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String, required: true},
    //reference to the user who created the blog
    //each blog has a user
    //user can have many blogs
    user: {type: mongoose.Types.ObjectId, ref:"User", required: true}
});

export default mongoose.model("Blog", blogSchema);
// stored as blogs in the database