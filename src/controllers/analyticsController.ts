import { Request, Response } from 'express';
import Project from '../models/Project';
import Blog from '../models/Blog';
import Message from '../models/Message';
import Service from '../models/Service';

export const getAnalytics = async (req: Request, res: Response) => {
  const projectCount = await Project.countDocuments();
  const blogCount = await Blog.countDocuments();
  const serviceCount = await Service.countDocuments();
  const unreadMessages = await Message.countDocuments({ status: 'unread' });

  res.json({
    projects: projectCount,
    blogs: blogCount,
    services: serviceCount,
    messages: unreadMessages,
  });
};
