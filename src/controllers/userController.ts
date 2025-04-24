import { Request, Response } from "express";
import User from "../models/User";

// Promote user to admin
export const promoteUserToAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return void res.status(404).json({ message: "User not found" });

    if (user.role === "admin") {
      return void res.status(400).json({ message: "User is already an admin" });
    }

    user.role = "admin";
    await user.save();

    res.status(200).json({ message: "User promoted to admin successfully" });
  } catch (error) {
    console.error("Error promoting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, "_id email role"); // return only ID, email, and role
    res.status(200).json(users);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
