import { Request, Response } from "express";
import { JwtUserPayload, TaskType } from "../utils/types/interface";
import jwt from "jsonwebtoken";
import Task from "../models/task.model";
import User from "../models/users.model";
import ActivityLog from "../models/activityLog.model";

export const createNewTask = async (req: Request, res: Response) => {
  try {
    const taskDetail: TaskType = req.body;
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const decodedUser = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtUserPayload;

    if (!decodedUser?.id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    if (!taskDetail || !taskDetail.title) {
      res.status(400).json({ message: "Invalid task data" });
      return;
    }

    const newTask = new Task({
      ...taskDetail,
      owner: decodedUser.id,
    });

    const user = await User.findByIdAndUpdate(
      decodedUser.id,
      { $push: { tasks: newTask._id } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
    return;
  } catch (err: any) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
    return;
  }
};

export const unlinkTask = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const { taskId } = req.body;

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const decodedUser = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtUserPayload;

    if (!decodedUser?.id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    if (!taskId) {
      res.status(400).json({ message: "Task ID is required" });
      return;
    }

    const task = await Task.findOne({ _id: taskId, owner: decodedUser.id });
    if (!task) {
      res.status(404).json({ message: "Task not found or unauthorized" });
      return;
    }

    if(!task.isLinked){
      res.status(200).json({
        message: "Task not found"
      })
      return
    }

    // Remove reference from user
    await User.findByIdAndUpdate(
      decodedUser.id,
      { $pull: { tasks: taskId } },
      { new: true }
    );

    await Task.findByIdAndUpdate(taskId, { isLinked: false });

    // Log the activity
    const newActivity = new ActivityLog({
      user: decodedUser.id,
      type: "delete",
      itemId: taskId,
      itemModel: "Task",
    });

    await newActivity.save();

    res.status(200).json({ message: "Task unlinked from user successfully" });
    return;
  } catch (err: any) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
    return;
  }
};
