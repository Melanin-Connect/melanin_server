import { Request, Response } from 'express';
import Blog from '../models/Blog';

// Get all blogs
export const getBlogs = async (req: Request, res: Response): Promise<Response> => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};

// Get single blog
export const getBlogById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};

// Create blog
export const createBlog = async (req: Request, res: Response): Promise<Response> => {
    try {
        const blog = await Blog.create(req.body);
        return res.status(201).json(blog);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};

// Update blog
export const updateBlog = async (req: Request, res: Response): Promise<Response> => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};

// Like a blog
export const likeBlog = async (req: Request, res: Response): Promise<Response> => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};

// Add comment to blog
export const addComment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user, text } = req.body;
        if (!user || !text) return res.status(400).json({ message: 'User and text are required' });

        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.comments.push({
            user, text, createdAt: new Date(),
            _id: undefined
        });
        await blog.save();

        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id, commentId } = req.params; // Blog ID and Comment ID

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        // Filter out the comment
        const updatedComments = blog.comments.filter(comment => comment._id?.toString() !== commentId);

        // If no comment was removed, return 404
        if (blog.comments.length === updatedComments.length) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Update the blog's comments
        blog.comments = updatedComments;
        await blog.save();

        return res.status(200).json({ message: 'Comment deleted successfully', blog });
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};



// Delete blog
export const deleteBlog = async (req: Request, res: Response): Promise<Response> => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        return res.status(200).json({ message: 'Blog deleted' });
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};
