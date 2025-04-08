import Chat from '../models/chat.model.js';

class ChatService {
    async saveMessage(senderId, receiverId, message) {
        try {
            let chat = await Chat.findOne({
                $or: [
                    { 'conversation.p1': senderId, 'conversation.p2': receiverId },
                    { 'conversation.p1': receiverId, 'conversation.p2': senderId }
                ]
            });

            // If no chat exists, create a new one
            if (!chat) {
                chat = new Chat({
                    conversation: { p1: senderId, p2: receiverId },
                    messages: []
                });
            }
            // Add new message to the messages array
            chat.messages.push({
                senderId,
                message,
                timestamp: new Date()
            });
            await chat.save();
            console.log('Message saved:', chat);
            
            return chat;
        } catch (error) {
            throw new Error('Error saving message: ' + error.message);
        }
    }

    async getChatHistory(userId1, userId2) {
        try {
            const chat = await Chat.findOne({
                $or: [
                    { 'conversation.p1': userId1, 'conversation.p2': userId2 },
                    { 'conversation.p1': userId2, 'conversation.p2': userId1 }
                ]
            });

            if (!chat) {
                return []; // No chat found
            }

            return chat.messages;
        } catch (error) {
            throw new Error('Error retrieving chat history: ' + error.message);
        }
    }

    async getChatList(userId) {
        try {
            const chats = await Chat.find({
                $or: [
                    { 'conversation.p1': userId },
                    { 'conversation.p2': userId }
                ]
            });
            return chats.map(chat => ({
                participants: chat.participants,
                lastMessage: chat.messages[chat.messages.length - 1]
            }));
        } catch (error) {
            throw new Error('Error retrieving chat list: ' + error.message);
        }
    }
}

export const chatService = new ChatService();
