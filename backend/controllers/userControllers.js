import User from "../dbmodels/User.js";
import Blog from "../dbmodels/Blog.js";
import bcrypt from "bcryptjs";

//get all users
export const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await User.find();
        // find() is a mongoose method that returns all the users in the database
    } catch (error) {
       console.log(error);
    }
    if (!users) {
        return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({users});
};

//signup
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
        // findOne() is a mongoose method that returns the user with the email provided
    } catch (error) {
        return console.log(error);
    }
    // if the user already exists, return an error
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    // create a new user
    const newUser = new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    });
    try {
        await newUser.save();
        // save() is a mongoose method that saves the new user to the database
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ newUser });
}

//login
export const login = async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    //find user w/ email
    try{
        existingUser= await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    //if user doesn't exist, return error
    if (!existingUser){
        return res.status(400).json({message: "User doesn't exist"});
    }
    //check password
    if (bcrypt.compareSync(password, existingUser.password)){
        return res.status(200).json({message: "Login successful", user:existingUser});
    } else {
        return res.status(400).json({message: "Incorrect password"});
    }
}


//delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
        //need to delete the user from the blogs collection as well
        await Blog.deleteMany({user:id});
        
        // findByIdAndDelete() is a mongoose method that deletes the user with the id provided
    } catch (error) {
        return console.log(error);
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted" });
}


