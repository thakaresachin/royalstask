import express from "express";
import { createUser, loginUser } from "../controller/userController.js";

const userrouter = express.Router();

// ADMIN → CREATE USER
userrouter.post("/create", createUser );

// LOGIN (ADMIN / USER)
userrouter.post("/login", loginUser);

export default userrouter;
