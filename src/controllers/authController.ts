import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Register user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password} = req.body; // default role is "user"

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password});  // Save 
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role, email: newUser.email }, // Include role in JWT
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User registered successfully",
      token, role: newUser.role });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email }, // Include role in JWT
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful",
      token, role: user.role });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Logout user
export const logoutUser = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Logout successful" });
};

