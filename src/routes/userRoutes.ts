import { Router } from "express";
import { promoteUserToAdmin, getAllUsers } from "../controllers/userController";
import authMiddleware, { isGeneralAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAllUsers); // GET /api/users - List all users
// ✅ PATCH /api/users/:id/role
router.patch("/:id/role", authMiddleware, isGeneralAdmin, promoteUserToAdmin);

export default router;
