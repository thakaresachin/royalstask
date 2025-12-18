import express from "express";
import {
  createTask,
  getUserTasks,
  updateTaskStatus
} from "../controller/taskController.js";

const usertaskrouter = express.Router();

// ADMIN → ASSIGN TASK
usertaskrouter.post("/create", createTask);

// USER → VIEW ASSIGNED TASKS
usertaskrouter.get("/user/:userId", getUserTasks);

// USER → UPDATE TASK STATUS
usertaskrouter.put("/update/:taskId", updateTaskStatus);

export default usertaskrouter;
