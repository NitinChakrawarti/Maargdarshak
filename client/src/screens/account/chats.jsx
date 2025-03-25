import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import Layout from '../auth/layout';
import { ArrowBigRightIcon } from 'lucide-react';

const Chats = () => {
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState({});
    const [mentorlist, setmentorlist] = useState(true);

    const mentors = useSelector(state => state.mentors);

    const handleSendMessage = (event) => {
        if (message.trim() && selectedMentor) {
            setChatHistory(prevHistory => ({
                ...prevHistory,
                [selectedMentor.id]: [
                    ...(prevHistory[selectedMentor.id] || []),
                    { sender: 'me', text: message }
                ]
            }));
            setMessage('');
        }
    };

    const openChat = (mentor) => {
        setSelectedMentor(mentor);
    };

    const closesidebar =()=>{
        setmentorlist(false)
    }

    return (
        <Layout>
            <div className="flex flex-col md:flex-row-reverse h-[100%] bg-bg mt-10 md:mt-0">
                {/* Mentors List */}
                <div className={`bg-bg md:bg-primary  top-0 pt-16 text-white p-4 md:h-screen md:w-auto w-full ${mentorlist ? "block" : "hidden"} `}>
                    <h2 className="text-3xl font-bold mb-4 text-primary md:text-white flex items-center gap-4 ">
                        <span className='cursor-pointer md:block hidden '
                        onClick={closesidebar}
                        >
                            <ArrowBigRightIcon />
                        </span>
                        Mentors
                    </h2>
                    {mentors.mentors.length > 0 ? (
                        <div className={`space-y-4 md:contents ${selectedMentor ? 'hidden' : 'contents'}`}>
                            {mentors.mentors.map((mentor) => (
                                <div
                                    key={mentor.id}
                                    onClick={() => openChat(mentor)}
                                    className={`cursor-pointer p-3 rounded-lg ${selectedMentor?.id === mentor.id
                                        ? 'bg-bg text-primary'
                                        : 'bg-primary/80 text-white'
                                        } hover:bg-white hover:text-primary transition`}
                                >
                                    <h3 className="font-semibold">{mentor.name}</h3>
                                    <p className="text-sm">{mentor.jobTitle}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-3 rounded-lg bg-bg text-primary">
                            <h3 className="font-semibold">No Mentors added</h3>
                            <p className="text-sm">Click here to explore mentors</p>
                        </div>
                    )}
                </div>

                {/* Chat Section */}
                <div className={`flex-1 md:flex flex-col px-8  md:h-screen ${selectedMentor ? 'contents' : 'hidden'}`}>
                    {selectedMentor ? (
                        <div className="h-[76vmax] md:h-[100%] flex flex-col justify-between">
                            <div className="sticky top-6 mt-4 md:top-4 bg-bg py-4 md:px-0 px-2 rounded-t-lg flex justify-between items-center">
                                <div className='flex gap-2 items-center w-full'>
                                    <img src={selectedMentor.image} alt="" className='w-16 h-16 object-cover rounded-[100%]' />
                                    <div className='flex items-center justify-between w-full'>
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-700">
                                                Chat with {selectedMentor.name}
                                            </h2>
                                            <p className="text-sm text-gray-500">{selectedMentor.jobTitle}</p>
                                        </div>
                                        <div className="md:hidden">
                                            <button
                                                onClick={() => setSelectedMentor(null)}
                                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
                                            >
                                                Back
                                            </button>
                                        </div>
                                        {
                                            ! mentorlist && <div className="md:block hidden">
                                            <button
                                                onClick={() => setmentorlist(true)}
                                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
                                            >
                                                Show list
                                            </button>
                                        </div>
                                        }
                                    </div>
                                </div>
                                {/* <div className='md:flex justify-center items-center gap-4 px-4 hidden'>
                                    <IoIosCall className="text-2xl text-primary" />
                                    <FaVideo className="text-2xl text-primary ml-4" />
                                </div> */}
                            </div>

                            <div className="flex-1 h-full overflow-y-auto bg-bg p-4 border rounded-b-lg space-y-3">
                                {chatHistory[selectedMentor.id]?.map((chat, index) => (
                                    <div
                                        key={index}
                                        className={`${chat.sender === 'me' ? 'text-right' : 'text-left'}`}
                                    >
                                        <p
                                            className={`inline-block px-4 py-2 rounded-lg ${chat.sender === 'me'
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-200 text-black'
                                                }`}
                                        >
                                            {chat.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center w-full border-t p-2 md:relative fixed bottom-4" >
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="ml-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center flex-1">
                            <p className="text-gray-500 text-lg">Select a mentor to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Chats;
