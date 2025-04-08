import { WebSocketServer } from 'ws';
import { chatService } from './chat.service.js';

class WebSocketService {
    wss = null;
    clients = new Map();

    initialize = (server) => {
        this.wss = new WebSocketServer({ server });

        this.wss.on('connection', (ws, req) => {
            console.log('New client connected');

            const url = new URL(req.url || '/', 'ws://localhost');
            const userId = url.searchParams.get('userId');

            if (!userId) {
                ws.close(1008, 'User ID is required');
                return;
            }

            this.clients.set(userId, ws);

            ws.on('message', (msg) => this.handleIncomingMessage(userId, msg, ws));
            ws.on('close', () => this.clients.delete(userId));

            ws.send(JSON.stringify({
                type: 'connection',
                message: 'Connected to WebSocket server'
            }));
        });
    }

    handleIncomingMessage = async (senderId, msg, ws) => {
        try {
            const data = JSON.parse(msg);
            await this.handleMessage(senderId, data);
        } catch (err) {
            console.error('Message error:', err);
            ws.send(JSON.stringify({
                type: 'error',
                message: 'Error processing message'
            }));
        }
    }

    handleMessage = async (senderId, { receiverId, message }) => {
        if (!receiverId || !message) {
            throw new Error('Receiver ID and message are required');
        }

        await chatService.saveMessage(senderId, receiverId, message);

        const payload = {
            senderId,
            message,
            timestamp: new Date()
        };

        const receiverWs = this.clients.get(receiverId);
        if (receiverWs?.readyState === 1) {
            receiverWs.send(JSON.stringify({
                type: 'private_message',
                data: payload
            }));
        }

        const senderWs = this.clients.get(senderId);
        if (senderWs?.readyState === 1) {
            senderWs.send(JSON.stringify({
                type: 'message_sent',
                data: { ...payload, receiverId }
            }));
        }
    }
}

export const webSocketService = new WebSocketService();
