import { chatService } from '../services/chat.service.js';
import APIError from '../utils/APIError.js';
import ResponseHandler from '../utils/APIResponse.js';
import statusCodeUtility from '../utils/statusCodeUtility.js';

class ChatController {
    async sendMessage(req, res) {
        const { senderId, receiverId, message } = req.body;
        if (!senderId || !receiverId || !message) {
            return APIError(statusCodeUtility.BadRequest, 'Sender ID, Receiver ID, and message are required', res);
        }
        const chat = await chatService.saveMessage(senderId, receiverId, message);
        return ResponseHandler(statusCodeUtility.Success, 'Message sent successfully', chat, res);
    }

    async getChatHistory(req, res) {
        const { userId1, userId2 } = req.query;

        if (!userId1 || !userId2) {
            return APIError(statusCodeUtility.BadRequest, 'User IDs are required', res);
        }
        const chatHistory = await chatService.getChatHistory(userId1, userId2);
        return ResponseHandler(statusCodeUtility.Success, 'Chat history retrieved successfully', chatHistory, res);
    }

    async getChatList(req, res) {
        const { userId } = req.query;

        if (!userId) {
            return APIError(statusCodeUtility.BadRequest, 'User ID is required', res);
        }
        const chatList = await chatService.getChatList(userId);
        return ResponseHandler(statusCodeUtility.Success, 'Chat list retrieved successfully', chatList, res);
    }
}

export const chatController = new ChatController();
