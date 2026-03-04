import { Request, Response } from 'express';
import Message from '../models/Message';

export const getMessages = async (req: Request, res: Response) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
};

export const createMessage = async (req: Request, res: Response) => {
  const message = new Message(req.body);
  const createdMessage = await message.save();
  res.status(201).json(createdMessage);
};

export const updateMessageStatus = async (req: Request, res: Response) => {
  const message = await Message.findById(req.params.id);
  if (message) {
    message.status = req.body.status;
    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const message = await Message.findById(req.params.id);
  if (message) {
    await message.deleteOne();
    res.json({ message: 'Message removed' });
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
};
