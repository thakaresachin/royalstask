import express from "express";
import { createUser, loginUser } from "../controller/userController.js";

const userrouter = express.Router();

userrouter.post("/create", createUser );

userrouter.post("/login", loginUser);

export default userrouter;
