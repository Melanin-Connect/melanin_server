import { Router } from "express";
import { 
  getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, 
  likeBlog, addComment, deleteComment 
} from "../controllers/blogController";
import authMiddleware, { authorizeRoles } from "../middleware/authMiddleware";
import { rateLimiter } from "../middleware/rateLimitMiddleware";

const router = Router();

// Middleware to handle async errors
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.use(rateLimiter);

// Open to all authenticated users
router.get("/", asyncHandler(getBlogs));
router.get("/:id", authMiddleware, asyncHandler(getBlogById));

// Only admin and editor can create blogs
router.post("/", authMiddleware, authorizeRoles("admin", "editor"), asyncHandler(createBlog));

// Only admin and editor can update blogs
router.put("/:id", authMiddleware, authorizeRoles("admin", "editor"), asyncHandler(updateBlog));

// Only admin can delete blogs
router.delete("/:id", authMiddleware, authorizeRoles("admin"), asyncHandler(deleteBlog));

// Like and comment features are open to all authenticated users
router.patch("/:id/like", authMiddleware, asyncHandler(likeBlog));
router.post("/:id/comment", authMiddleware, asyncHandler(addComment));
router.delete("/:id/comment/:commentId", authMiddleware, asyncHandler(deleteComment));

export default router;
