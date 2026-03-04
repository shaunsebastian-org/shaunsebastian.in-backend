import { Request, Response } from 'express';
import Blog from '../models/Blog';

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (blog) res.json(blog);
  else {
    res.status(404);
    throw new Error('Blog not found');
  }
};

export const createBlog = async (req: Request, res: Response) => {
  const blog = new Blog(req.body);
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
};

export const updateBlog = async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    Object.assign(blog, req.body);
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    await blog.deleteOne();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
};
