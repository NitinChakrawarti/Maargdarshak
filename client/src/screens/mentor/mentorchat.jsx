import { useState, useEffect } from "react";
import Layout from "../../layout/auth/layout";
import { MessageCircle, X, Search, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { MentorChatList } from "../../api";
import { useSelector } from "react-redux";
import ChatArea from "../../components/chatarea";

const MentorChat = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showSidebar, setShowSidebar] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [users, setUsers] = useState([]);

    const { mentor } = useSelector((state) => state.mentor);

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

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await MentorChatList(mentor._id);
            const chatData = response.data.data;

            // Map API response to the required format
            const formattedUsers = chatData.map(chat => {
                const otherParticipant = chat.participants.find(p => p !== "user1");
                return {
                    id: otherParticipant,
                    name: otherParticipant, // Replace with actual user name if available
                    lastMessage: chat.lastMessage.message,
                    unread: 0, // Replace with actual unread count if available
                    status: "offline" // Replace with actual status if available
                };
            });
            setUsers(formattedUsers);
        };

        fetchUsers();
    }, []);

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
                                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                {user.name.charAt(0)}
                                            </div>
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
                    <ChatArea
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        isMobile={isMobile}
                        messages={messages}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        handleSendMessage={handleSendMessage}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default MentorChat;
