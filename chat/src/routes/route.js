import express from 'express';
import { chatController } from '../controllers/chat.controller.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

// POST /api/chat/send
router.post('/send', asyncHandler(chatController.sendMessage));

// GET /api/chat/history?userId1=...&userId2=...
router.get('/history', asyncHandler(chatController.getChatHistory));

// GET /api/chat/chat-list
router.get('/chat-list', asyncHandler(chatController.getChatList));

export default router;
