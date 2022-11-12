import express from "express";
import { getAllUsers, signup, deleteUser, login } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/",getAllUsers);

router.post("/signup",signup);

router.post("/login",login);

router.delete("/delete/:id", deleteUser);


export default router;