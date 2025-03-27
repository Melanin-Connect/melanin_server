import { Router } from 'express';
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, likeBlog, addComment, deleteComment } from '../controllers/blogController';

const router = Router();

// Middleware to handle async errors
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(getBlogs));
router.get('/:id', asyncHandler(getBlogById));
router.post('/', asyncHandler(createBlog));
router.put('/:id', asyncHandler(updateBlog));
router.delete('/:id', asyncHandler(deleteBlog));
router.patch('/:id/like', asyncHandler(likeBlog)); 
router.post('/:id/comment', asyncHandler(addComment)); 
router.delete('/:id/comment/:commentId', asyncHandler(deleteComment));

export default router;
