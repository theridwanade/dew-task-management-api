import { Request, Response } from "express";
import { JwtUserPayload, TaskType } from "../utils/types/interface";
import jwt from "jsonwebtoken";
import Task from "../models/task.model";
import User from "../models/users.model";

export const createNewTask = async (req: Request, res: Response) => {
  try {
    const taskDetail: TaskType = req.body;
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return 
    }

    const decodedUser = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtUserPayload;

    if (!decodedUser?.id) {
      res.status(401).json({ message: "Invalid token" });
      return 
    }

    if (!taskDetail || !taskDetail.title ) {
      res.status(400).json({ message: "Invalid task data" });
      return 
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
      return 
    }

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
    return 

  } catch (err: any) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
    return 
  }
};
