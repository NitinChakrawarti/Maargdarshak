import React, { useEffect, useState } from "react";
import { GetMentorDetails, IntializeChat } from "../../api";
import Layout from "../../layout/auth/layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Explore = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.auth);

    useEffect(() => {
        document.title = "Explore | Mentor-Connect";

        const fetchMentors = async () => {
            try {
                const res = await GetMentorDetails();
                setMentors(res.data.data || []);
            } catch (error) {
                console.error("Error fetching mentors", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    const handleChat = async (mentorId) => {
        try {
            const response = await IntializeChat({ userId1: mentorId, userId2: data._id });
            if (response.status === 200) {
                console.log("Chat initiated successfully", response.data);
                navigate("/chat");
            } else {
                console.error("Error initiating chat", response.data.message);
            }
        } catch (error) {
            console.error("Chat initiation failed", error);
        }
    };

    const handleDetails = (mentorId) => {
        navigate(`/mentor/${mentorId}`);
    };

    return (
        <Layout>
            <section className="bg-bg px-2">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl lg:text-4xl font-bold text-brand-blue pt-4">
                        Meet Our Mentors
                    </h1>

                    {loading ? (
                        <p className="text-center text-brand-navy text-lg">Loading mentors...</p>
                    ) : mentors.length === 0 ? (
                        <p className="text-center text-red-600">No mentors found.</p>
                    ) : (
                        <div className="grid grid-cols-1 lg:px-12 lg:py-8 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {mentors.map((mentor) => (
                                <div
                                    key={mentor._id}
                                    className="group relative bg-gradient-to-br from-brand-navy via-dark-blue to-[#1e3a8a] rounded-2xl p-6 overflow-hidden hover:scale-102 transition-all duration-300"
                                >
                                    {/* Animated background elements */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#2c67a6]/20 via-[#0ea5e9]/20 to-[#3b82f6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#b5d5e5]/30 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#f7a35c]/30 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Profile & Name */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                src={mentor.profile}
                                                alt={mentor.name}
                                                className="w-16 h-16 object-cover rounded-full ring-2 ring-[#b5d5e5]/40 group-hover:ring-[#b5d5e5]/80 transition-all"
                                            />
                                            <div>
                                                <h3 className="text-white font-bold text-lg leading-tight">
                                                    {mentor.name}
                                                </h3>
                                                <p className="text-[#b5d5e5] text-sm font-medium capitalize">
                                                    {mentor.role || "Mentor"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quick Info */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#0ea5e9] text-xs">🎯</span>
                                                <p className="text-white/80 text-xs truncate">
                                                    {mentor.domains?.slice(0, 2).join(", ") || "General"}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#f7a35c] text-xs">⚡</span>
                                                <p className="text-white/80 text-xs">
                                                    {mentor.experience || 0} yrs experience
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleChat(mentor._id)}
                                                className=" cursor-pointer flex-1 bg-white/20 backdrop-blur-sm text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#b5d5e5]/30 transition-all border border-[#b5d5e5]/20"
                                            >
                                                Chat
                                            </button>
                                            <button
                                                onClick={() => handleDetails(mentor._id)}
                                                className="flex-1 bg-gradient-to-r from-[#2c67a6]/80 to-[#0ea5e9]/80 text-white py-2 px-3 rounded-lg cursor-pointer text-sm font-medium hover:from-[#2c67a6] hover:to-[#0ea5e9] transition-all"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>

                                    {/* Glowing border effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0ea5e9]/50 via-[#2c67a6]/50 to-[#3b82f6]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Explore;
