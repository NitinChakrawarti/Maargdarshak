import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { chatController } from '../controllers/chat.controller.js';

const router = express.Router();

// POST /api/chat/create
router.post('/create', asyncHandler(chatController.createChat));

// POST /api/chat/send
router.post('/send', asyncHandler(chatController.sendMessage));

// GET /api/chat/chat-list
router.get('/chat-list', asyncHandler(chatController.getChatList));

// GET /api/chat/history?userId1=...&userId2=...
router.get('/history', asyncHandler(chatController.getChatHistory));

export default router;
