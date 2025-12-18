import Task from "../model/Task.js";

const ADMIN_ID = "admin123";
const ADMIN_PASSWORD = "admin@123";


export const createTask = async (req, res) => {
  try {
    const {
      adminId,
      adminPassword,
      title,
      description,
      assignedTo,
      priority,
    } = req.body;

    if (adminId !== ADMIN_ID || adminPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized Admin" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      priority,
    });

    res.status(201).json({
      success: true,
      message: "Task assigned successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


import mongoose from "mongoose";

export const getUserTasks = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const tasks = await Task.find({
      assignedTo: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks: tasks,  
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
