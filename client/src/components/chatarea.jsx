import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, X, MessageCircle, Send } from "lucide-react";
import { useSelector } from "react-redux";
import { MentorChatHistory } from "../api";

const ChatArea = React.memo(({ selectedUser, isMobile, handleBackToList }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [status, setStatus] = useState("Disconnected");
    const inputRef = useRef(null);

    const ws = useRef(null);
    const messageEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const { data: mentor } = useSelector((state) => state.auth);
    const { data: user } = useSelector((state) => state.auth);
    const scrollToBottom = () => {
        setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: "smooth" }), 500);
    };

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

    const formatTime = (timestamp) => new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(timestamp);

    const formatDate = (timestamp) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const messageDate = new Date(timestamp);

        if (messageDate.toDateString() === today.toDateString()) return "Today";
        if (messageDate.toDateString() === yesterday.toDateString()) return "Yesterday";

        return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(messageDate);
    };

    const groupMessagesByDate = () => {
        const groups = {};
        chatMessages.forEach((msg) => {
            const date = new Date(msg.timestamp).toDateString();
            if (!groups[date]) groups[date] = [];
            groups[date].push(msg);
        });

        return Object.entries(groups).map(([date, messages]) => ({
            date,
            displayDate: formatDate(date),
            messages,
        }));
    };

    useEffect(() => {
        if (!selectedUser) return;

        const socket = new WebSocket(`${import.meta.env.VITE_CHAT_WS}?userId=${mentor?._id || user?._id}`);
        ws.current = socket;

        socket.onopen = () => {
            setStatus("Connected");
            addMessage("system", "Connected to server");
        };

        socket.onclose = () => {
            setStatus("Disconnected");
            addMessage("system", "Disconnected from server");
        };

        socket.onmessage = ({ data }) => {
            const parsed = JSON.parse(data);
            if (parsed.type === "private_message" && parsed.data.senderId === selectedUser.id) addMessage("user", parsed.data.message);
            if (parsed.type === "error") addMessage("system", parsed.message);
        };

        return () => socket.close();
    }, [selectedUser]);

    useEffect(() => {
        if (!selectedUser) return;

        const fetchHistory = async () => {
            const { data } = await MentorChatHistory({
                userId1: selectedUser.id,
                userId2: mentor?._id || user?._id,
            });

            const formatted = (data?.data || []).map((msg) => ({
                id: msg._id,
                sender: msg.senderId === selectedUser.id ? "user" : "mentor",
                text: msg.message,
                timestamp: new Date(msg.timestamp),
            }));

            setChatMessages(formatted);
            scrollToBottom();
        };

        fetchHistory();
    }, [selectedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const payload = { receiverId: selectedUser.id, message: newMessage };
        addMessage("mentor", newMessage);
        ws.current?.send(JSON.stringify(payload));
        setNewMessage("");
    };

    if (!selectedUser) return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
            <div className="p-8 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm shadow-md border border-slate-100 max-w-md rounded-lg">
                <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <MessageCircle className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">No conversation selected</h3>
                <p className="text-slate-500 text-center mb-6">Select a contact from the sidebar to start messaging</p>
                <div className="flex gap-2">
                    <div className="w-2 h-1 rounded-full bg-blue-100" />
                    <div className="w-2 h-1 rounded-full bg-blue-200" />
                    <div className="w-2 h-1 rounded-full bg-blue-300" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="p-5.5 border-b bg-white shadow-sm flex justify-between items-center">
                <div className="flex items-center">
                    {isMobile && (
                        <button onClick={handleBackToList} className="mr-2 p-2 hover:bg-slate-100 rounded-full">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                    )}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            {selectedUser.profile ? (
                                <img
                                    src={selectedUser.profile}
                                    alt={selectedUser.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                                    {selectedUser.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="font-medium text-slate-800">{selectedUser.name}</h2>
                            <p className="text-xs text-slate-500">{status}</p>
                        </div>
                    </div>
                </div>
                {!isMobile && (
                    <button onClick={handleBackToList} className="p-2 cursor-pointer hover:bg-slate-100 rounded-full">
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Chat body */}
            <div className="flex-1 h-0 overflow-y-auto" ref={chatContainerRef}>
                <div className="p-4 space-y-6">
                    {groupMessagesByDate().map(({ date, displayDate, messages }) => (
                        <div key={date} className="space-y-3">
                            <div className="sticky top-0 z-10 flex justify-center py-2">
                                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                    {displayDate}
                                </div>
                            </div>
                            {messages.map((msg) => {
                                const baseStyle = "max-w-[75%] rounded-2xl px-4 pt-2.5 shadow-sm";
                                const userStyle = "bg-white border border-slate-200 text-slate-800 rounded-bl-none";
                                const mentorStyle = "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none";

                                return (
                                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-start" : msg.sender === "mentor" ? "justify-end" : "justify-center"} gap-1.5`}>
                                        {msg.sender === "system" ? (
                                            <div className="bg-slate-200/80 text-slate-600 text-xs py-1.5 px-3 rounded-full max-w-[85%] mx-auto">
                                                {msg.text}
                                            </div>
                                        ) : (
                                            <div className={`${baseStyle} ${msg.sender === "user" ? userStyle : mentorStyle}`}>
                                                <div className="whitespace-pre-wrap break-words">
                                                    {msg.text}
                                                    <div className="self-end mb-1 text-[10px] text-center">
                                                        {formatTime(msg.timestamp)}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
                        ref={inputRef}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium flex cursor-pointer items-center gap-1"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </form>
            </div>
        </div>
    );
});

export default ChatArea;
