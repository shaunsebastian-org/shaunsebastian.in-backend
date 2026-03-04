import { Request, Response } from 'express';
import Message from '../models/Message';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message || 'Failed to fetch messages' });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const message = new Message(req.body);
    const createdMessage = await message.save();
    res.status(201).json(createdMessage);
  } catch (error) {
    const err = error as Error;
    console.error('Create message error:', err);
    res.status(400).json({ message: err.message || 'Failed to create message' });
  }
};

export const updateMessageStatus = async (req: Request, res: Response) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      message.status = req.body.status;
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    const err = error as Error;
    console.error('Update message error:', err);
    res.status(400).json({ message: err.message || 'Failed to update message' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      await message.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message || 'Failed to delete message' });
  }
};
