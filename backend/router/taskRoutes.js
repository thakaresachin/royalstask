import express from "express";
import {
  createTask,
  getUserTasks,
  updateTaskStatus
} from "../controller/taskController.js";

const usertaskrouter = express.Router();

usertaskrouter.post("/create", createTask);


usertaskrouter.get("/user/:userId", getUserTasks);


usertaskrouter.put("/update/:taskId", updateTaskStatus);

export default usertaskrouter;
