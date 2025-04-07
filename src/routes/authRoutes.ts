import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController"; 
import { authRateLimiter } from "../middleware/rateLimitMiddleware";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router(); 

router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/logout", authMiddleware, logoutUser);

export default router;