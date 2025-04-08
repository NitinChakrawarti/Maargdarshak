import { useState, useEffect } from "react";
import Layout from "../../layout/auth/layout";
import { MessageCircle, X, Search, ChevronLeft, Menu } from "lucide-react";
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
    const { user } = useSelector((state) => state.user);

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
            try {
                const response = await MentorChatList(mentor?._id || user?._id);
                const chatData = response.data.data;
                // Map API response to the required format
                const formattedUsers = chatData.map(chat => {
                    const otherParticipant = chat.participants.find(p => p !== mentor?._id && p !== user?._id);
                    return {
                        id: otherParticipant,
                        name: otherParticipant, // Replace with actual user name if available
                        lastMessage: chat.lastMessage.message,
                        unread: 0, // Replace with actual unread count if available
                        status: "offline" // Replace with actual status if available
                    };
                });
                setUsers(formattedUsers);
            } catch (error) {
                console.error("Error fetching chat list:", error);
            }
        };

        fetchUsers();
    }, [mentor?._id || user?._id]);

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
                <div
                    className={`${showSidebar ? 'w-full md:w-80' : 'w-0'} 
                    transition-all duration-300 border-r bg-white shadow-md overflow-hidden`}
                >
                    <div className="p-4 border-b">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto h-full pb-20">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <div
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors
                                        ${selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="relative">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                                    }`}></span>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="font-medium text-gray-800">{user.name}</h3>
                                                <p className="text-sm text-gray-500 truncate max-w-[180px]">{user.lastMessage}</p>
                                            </div>
                                        </div>
                                        {user.unread > 0 && (
                                            <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-medium">
                                                {user.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No conversations found
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className={`${(!showSidebar || !isMobile) ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-white overflow-hidden`}>
                    {selectedUser ? (
                        <ChatArea
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            isMobile={isMobile}
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            handleBackToList={handleBackToList}
                            messages={messages}
                            handleSendMessage={handleSendMessage}
                        />
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
                            <MessageCircle size={48} className="text-gray-400 mb-4" />
                            <h3 className="text-xl font-medium text-gray-600">Select a conversation</h3>
                            <p className="text-gray-500 mt-2">Choose a user to start chatting</p>
                        </div>
                    )}
                </div>


            </div>
        </Layout>
    );
};

export default MentorChat;