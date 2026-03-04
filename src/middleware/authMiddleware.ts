import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  } | null;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      req.user = await User.findById(decoded.id).select('-password') as any;
      
      if (!req.user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }
      
      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }
};

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
