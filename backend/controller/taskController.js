import Task from "../model/Task.js";

/*
  HARD-CODED ADMIN
*/
const ADMIN_ID = "admin123";
const ADMIN_PASSWORD = "admin@123";

/*
  ADMIN → CREATE / ASSIGN TASK
*/
export const createTask = async (req, res) => {
  try {
    const { adminId, adminPassword, title, description, assignedTo, priority } = req.body;

    if (adminId !== ADMIN_ID || adminPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized Admin" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      priority
    });

    res.status(201).json({
      message: "Task assigned successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
  USER → VIEW ASSIGNED TASKS
*/
import mongoose from "mongoose";

export const getUserTasks = async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await Task.find({
      assignedTo: new mongoose.Types.ObjectId(userId)
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/*
  USER → UPDATE TASK STATUS
*/
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task status updated",
      task
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
