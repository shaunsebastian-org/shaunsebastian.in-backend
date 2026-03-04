import express from 'express';
import { getMessages, createMessage, updateMessageStatus, deleteMessage } from '../controllers/messageController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, admin, getMessages);
router.post('/', createMessage);
router.put('/:id', protect, admin, updateMessageStatus);
router.delete('/:id', protect, admin, deleteMessage);

export default router;
