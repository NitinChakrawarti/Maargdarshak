import { useEffect, useRef, useState } from "react";
import { ChevronLeft, X, MessageCircle, Send } from "lucide-react";
import { MentorChatHistory } from "../api";
import { useSelector } from "react-redux";

const MENTOR_ID = "67f22ddd745b8e0a394b7acf";

const ChatArea = ({
    selectedUser,
    setSelectedUser,
    isMobile,
    newMessage,
    setNewMessage,
    handleBackToList,
}) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [status, setStatus] = useState("Disconnected");
    const ws = useRef(null);
    const messageEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const { mentor } = useSelector((state) => state.mentor);
    const { user } = useSelector((state) => state.user);

    // Scroll to bottom
    const scrollToBottom = () => {
        setTimeout(() => {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 500);
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
    useEffect(() => {
        if (!selectedUser) return;

        const socket = new WebSocket(`ws://localhost:5000?userId=${mentor?._id || user?._id}`);
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
                    userId2: mentor?._id || user?._id,
                });

                const formattedMessages =
                    response?.data?.data?.map((msg) => ({
                        id: msg._id,
                        sender: msg.senderId === selectedUser.id ? "user" : "mentor",
                        text: msg.message,
                        timestamp: new Date(msg.timestamp),
                    })) || [];

                setChatMessages(formattedMessages);
                scrollToBottom();
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

    // Format time
    const formatTime = (timestamp) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(timestamp);
    };

    // Format date for sticky headers
    const formatDate = (timestamp) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const messageDate = new Date(timestamp);

        if (messageDate.toDateString() === today.toDateString()) {
            return "Today";
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }).format(messageDate);
        }
    };

    // Group messages by date
    const groupMessagesByDate = () => {
        const groups = {};

        chatMessages.forEach(message => {
            const date = new Date(message.timestamp).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });

        return Object.entries(groups).map(([date, messages]) => ({
            date,
            displayDate: formatDate(new Date(date)),
            messages
        }));
    };

    // Empty state
    if (!selectedUser) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
                <div className="p-8 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm shadow-md border border-slate-100 max-w-md rounded-lg">
                    <div className="bg-blue-100 p-4 rounded-full mb-6">
                        <MessageCircle className="h-12 w-12 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-800 mb-2">No conversation selected</h3>
                    <p className="text-slate-500 text-center mb-6">
                        Select a contact from the sidebar to start messaging
                    </p>
                    <div className="flex gap-2">
                        <div className="flex-1 w-2 h-1 rounded-full bg-blue-100"></div>
                        <div className="flex-1 w-2 h-1 rounded-full bg-blue-200"></div>
                        <div className="flex-1 w-2 h-1 rounded-full bg-blue-300"></div>
                    </div>
                </div>
            </div>
        );
    }

    const groupedMessages = groupMessagesByDate();

    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-lg overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b bg-white shadow-sm flex justify-between items-center">
                <div className="flex items-center">
                    {isMobile && (
                        <button
                            onClick={handleBackToList}
                            className="mr-2 p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                    )}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                                {selectedUser.name.charAt(0)}
                            </div>
                            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${selectedUser.status === "online" ? "bg-green-500" : "bg-gray-400"
                                }`}></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="font-medium text-slate-800">{selectedUser.name}</h2>
                                <span className={`text-xs py-0.5 px-2 rounded-full ${selectedUser.status === "online"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-slate-200 text-slate-700"
                                    }`}>
                                    {selectedUser.status}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">
                                {status}
                            </p>
                        </div>
                    </div>
                </div>
                { !isMobile &&
                    <button
                        onClick={handleBackToList}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                }

            </div>

            {/* Messages */}
            <div
                className="flex-1 h-0 overflow-y-auto"
                ref={chatContainerRef}
            >
                <div className="p-4 space-y-6">
                    {groupedMessages.map((group) => (
                        <div key={group.date} className="space-y-3">
                            <div className="sticky top-0 z-10 flex justify-center py-2">
                                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                    {group.displayDate}
                                </div>
                            </div>

                            {group.messages.map((message) => {
                                const isUserMessage = message.sender === "user";
                                const isMentorMessage = message.sender === "mentor";
                                const isSystemMessage = message.sender === "system";

                                return (
                                    <div
                                        key={message.id}
                                        className={`flex ${isUserMessage ? "justify-start" : isMentorMessage ? "justify-end" : "justify-center"
                                            } gap-1.5`}
                                    >
                                        {isSystemMessage ? (
                                            <div className="bg-slate-200/80 text-slate-600 text-xs py-1.5 px-3 rounded-full max-w-[85%] mx-auto">
                                                {message.text}
                                            </div>
                                        ) : (
                                            <>
                                                <div className={`max-w-[75%] rounded-2xl px-4 pt-2.5 shadow-sm ${isUserMessage
                                                    ? "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
                                                    : "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                                                    }`}>
                                                    <div className="whitespace-pre-wrap break-words">
                                                        {message.text}
                                                        <div className={`self-end mb-1 text-[10px] text-center`}>
                                                            {formatTime(message.timestamp)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>
            </div>

            {/* Message Input */}
            <div className="p-3 bg-white border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1"
                        disabled={!newMessage.trim()}
                    >
                        <Send className="h-4 w-4" />
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatArea;
