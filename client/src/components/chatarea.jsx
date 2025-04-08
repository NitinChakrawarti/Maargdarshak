import { useEffect, useRef, useState } from "react";
import { ChevronLeft, X, MessageCircle } from "lucide-react";
import { MentorChatHistory } from "../api";

const MENTOR_ID = "67f22ddd745b8e0a394b7acf"; // Replace with dynamic mentor ID if needed

const ChatArea = ({
    selectedUser,
    setSelectedUser,
    isMobile,
    newMessage,
    setNewMessage,
}) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [status, setStatus] = useState("Disconnected");
    const ws = useRef(null);
    const messageEndRef = useRef(null);

    // Scroll to bottom
    const scrollToBottom = () => {
        setTimeout(() => {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
    };

    // Add message to chat
    const addMessage = (sender, text) => {
        setChatMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                sender,
                text,
                timestamp: new Date(),
            },
        ]);
        scrollToBottom();
    };

    // Back button (for mobile)
    const handleBackToList = () => setSelectedUser(null);

    // WebSocket setup
    useEffect(() => {
        if (!selectedUser) return;

        const socket = new WebSocket(`ws://localhost:5000?userId=${MENTOR_ID}`);
        ws.current = socket;

        socket.onopen = () => {
            setStatus("Connected");
            addMessage("system", "Connected to server");
        };

        socket.onclose = () => {
            setStatus("Disconnected");
            addMessage("system", "Disconnected from server");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case "private_message":
                    addMessage("user", data.data.message);
                    break;
                case "error":
                    addMessage("system", data.message);
                    break;
                default:
                    break;
            }
        };

        return () => socket.close();
    }, [selectedUser]);

    // Fetch chat history
    useEffect(() => {
        if (!selectedUser) return;

        const fetchChatHistory = async () => {
            try {
                const response = await MentorChatHistory({
                    userId1: selectedUser.id,
                    userId2: MENTOR_ID,
                });

                const formattedMessages =
                    response?.data?.data?.map((msg) => ({
                        id: msg._id,
                        sender: msg.senderId === selectedUser.id ? "user" : "mentor",
                        text: msg.message,
                        timestamp: new Date(msg.timestamp),
                    })) || [];

                setChatMessages(formattedMessages);
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };

        fetchChatHistory();
    }, [selectedUser]);

    // Handle sending messages
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageToSend = {
            receiverId: selectedUser.id,
            message: newMessage,
        };

        addMessage("mentor", newMessage); // Optimistic update
        ws.current?.send(JSON.stringify(messageToSend));
        setNewMessage("");
    };

    // Empty state
    if (!selectedUser) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                    <MessageCircle size={48} className="mx-auto mb-2 text-blue-500" />
                    <p className="text-xl">Select a conversation to start messaging</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Choose from your conversations on the left
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white shadow-sm flex justify-between items-center">
                <div className="flex items-center">
                    {isMobile && (
                        <button
                            onClick={handleBackToList}
                            className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    )}
                    <div className="relative">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {selectedUser.name.charAt(0)}
                        </div>
                        <div
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                selectedUser.status === "online"
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                            }`}
                        />
                    </div>
                    <div className="ml-3">
                        <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                        <p className="text-sm text-gray-500">{selectedUser.status}</p>
                    </div>
                </div>
                {!isMobile && (
                    <button
                        onClick={() => setSelectedUser(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {chatMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.sender === "mentor"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
                                message.sender === "mentor"
                                    ? "bg-blue-500 text-white"
                                    : message.sender === "system"
                                    ? "bg-gray-300 text-black italic"
                                    : "bg-white"
                            }`}
                        >
                            {message.text}
                            <div className="text-xs mt-1 opacity-70">
                                {message.timestamp.toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Send
                    </button>
                </div>
            </form>
        </>
    );
};

export default ChatArea;
