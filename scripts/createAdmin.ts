import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/User";

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ Connected to DB");

    const email = process.env.GENERAL_ADMIN_EMAIL;
    const password = process.env.GENERAL_ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("GENERAL_ADMIN_EMAIL and GENERAL_ADMIN_PASSWORD must be set in .env");
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ General admin already exists!");
      return process.exit(0);
    }

    const newAdmin = new User({
      email,
      password, //  Mongoose hash this via middleware
      role: "admin",
    });

    await newAdmin.save();
    console.log("🎉 General Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating general admin:", error);
    process.exit(1);
  }
}

createAdmin();
