import { Router } from "express";
import { promoteUserToAdmin, getAllUsers, getMyProfile, updateMyProfile } from "../controllers/userController";
import authMiddleware, { isGeneralAdmin } from "../middleware/authMiddleware";

const router = Router();

//admin specific routes
router.get("/", authMiddleware, isGeneralAdmin, getAllUsers); // GET /api/users - List all users by only general admin
// ✅ PATCH /api/users/:id/role
router.patch("/:id/role", authMiddleware, isGeneralAdmin, promoteUserToAdmin);

//Routes for authenticated users
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile)

export default router;
