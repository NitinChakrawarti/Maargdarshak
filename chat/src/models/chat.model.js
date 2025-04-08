import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
        index: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { _id: true });

const chatSchema = new mongoose.Schema({
    conversation: {
        p1: {
            type: String,
            required: true,
            index: true
        },
        p2: {
            type: String,
            required: true,
            index: true
        }
    },
    messages: [messageSchema]
}, {
    timestamps: true,
    indexes: [
        { 'conversation.p1': 1, 'conversation.p2': 1 }
    ]
});


chatSchema.virtual('participants').get(function () {
    return [this.conversation.p1, this.conversation.p2];
});


chatSchema.methods.hasParticipant = function (userId) {
    return this.conversation.p1 === userId || this.conversation.p2 === userId;
};

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;