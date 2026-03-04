import { Request, Response } from 'express';
import Blog from '../models/Blog';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message || 'Failed to fetch blogs' });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message || 'Failed to fetch blog' });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = new Blog(req.body);
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    const err = error as Error;
    console.error('Create blog error:', err);
    res.status(400).json({ message: err.message || 'Failed to create blog' });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      Object.assign(blog, req.body);
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    const err = error as Error;
    console.error('Update blog error:', err);
    res.status(400).json({ message: err.message || 'Failed to update blog' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message || 'Failed to delete blog' });
  }
};
