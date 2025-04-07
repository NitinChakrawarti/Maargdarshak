import { useState, useEffect } from "react";
import Layout from "../../layout/auth/layout";
import { MessageCircle, X, Search, ChevronLeft, ChevronRight, Menu } from "lucide-react";

const MentorChat = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showSidebar, setShowSidebar] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    // Check if screen is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Hide sidebar when user is selected on mobile
    useEffect(() => {
        if (isMobile && selectedUser) {
            setShowSidebar(false);
        }
    }, [selectedUser, isMobile]);

    // Mock users data - replace with actual API call
    const users = [
        { id: 1, name: "John Doe", lastMessage: "Hello mentor!", unread: 2, status: "online" },
        { id: 2, name: "Jane Smith", lastMessage: "Thank you for your help", unread: 0, status: "offline" },
        { id: 3, name: "Mike Johnson", lastMessage: "When is our next session?", unread: 1, status: "online" }
    ];

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setMessages([...messages, {
            id: messages.length + 1,
            text: newMessage,
            sender: 'mentor',
            timestamp: new Date()
        }]);
        setNewMessage("");
    };

    const handleBackToList = () => {
        setSelectedUser(null);
        setShowSidebar(true);
    };

    return (
        <Layout>
            <div className="flex h-[calc(100vh-64px)] bg-gray-50">
                {/* Users List Sidebar */}
                <div className={`${showSidebar ? 'w-full md:w-80' : 'w-0'} transition-all duration-300 border-r bg-white shadow-lg overflow-hidden`}>
                    <div className="p-4 border-b">
                        <div className="relative border-2 border-gray-200 rounded-lg ">
                            <Search className="absolute left-3 top-2.5 text-gray-400  " size={18} />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto h-full">
                        {filteredUsers.map(user => (
                            <div
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                                    selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                                user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                            }`}></div>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-medium">{user.name}</h3>
                                            <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                                        </div>
                                    </div>
                                    {user.unread > 0 && (
                                        <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                                            {user.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className={`${(!showSidebar || !isMobile) ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-white`}>
                    {selectedUser ? (
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
                                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                            selectedUser.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                        }`}></div>
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

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                {messages.map(message => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'mentor' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
                                            message.sender === 'mentor' 
                                                ? 'bg-blue-500 text-white' 
                                                : 'bg-white'
                                        }`}>
                                            {message.text}
                                            <div className="text-xs mt-1 opacity-70">
                                                {message.timestamp.toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
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
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <MessageCircle size={48} className="mx-auto mb-2 text-blue-500" />
                                <p className="text-xl">Select a conversation to start messaging</p>
                                <p className="text-sm text-gray-400 mt-2">Choose from your conversations on the left</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default MentorChat;
