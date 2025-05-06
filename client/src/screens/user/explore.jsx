import React, { useEffect, useState } from "react";
import { GetMentorDetails, IntializeChat } from "../../api";
import Layout from "../../layout/auth/layout";
import { useSelector } from "react-redux";

const Explore = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

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
        console.log(`Mentor ID: ${mentorId}`);
        
        const response = await IntializeChat({ userId1: mentorId, userId2: data._id });
        if (response.status === 200) {
            console.log(`Initiating chat with mentor ID: ${mentorId}`);
        }
        else{
            console.error("Error initiating chat", response.data.message);
        }
    }

    return (
        <Layout>
            <section className="bg-bg px-2">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <h1 className="text-2xl lg:text-4xl font-bold text-brand-blue pt-4">
                        Meet Our Mentors
                    </h1>

                    {/* Mentor Cards Grid */}
                    {loading ? (
                        <p className="text-center text-brand-navy text-lg">Loading mentors...</p>
                    ) : mentors.length === 0 ? (
                        <p className="text-center text-red-600">No mentors found.</p>
                    ) : (
                        <div className="grid grid-cols-1 lg:px-12 lg:py-8 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {mentors.map((mentor) => (
                                <div
                                    key={mentor._id}
                                    className="bg-white shadow-sm rounded-md p-8 flex flex-col items-center hover:shadow-md hover:scale-101 transition-transform duration-300"
                                >
                                    <img
                                        src={mentor.profile}
                                        alt={mentor.name}
                                        className="w-32 h-32 object-cover rounded-full mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-brand-blue mb-1">
                                        {mentor.name}
                                    </h3>
                                    <p className="text-md font-medium text-brand-navy capitalize">
                                        {mentor.role || "Mentor"}
                                    </p>
                                    <p className="text-soft-gray text-sm mt-3 text-center">
                                        <strong>Domains:</strong>{" "}
                                        {mentor.domains?.join(", ") || "N/A"}
                                    </p>
                                    <p className="text-soft-gray text-sm text-center">
                                        <strong>Experience:</strong> {mentor.experience || 0} yrs
                                    </p>
                                    <div className="text-soft-gray text-sm mt-3 text-center flex gap-20 items-center">
                                        <p><strong>Expertise:</strong>{" "}
                                            {mentor.expertise?.join(", ") || "N/A"}</p>
                                        <button
                                            onClick={() => handleChat(mentor._id)}
                                            className="bg-brand-blue text-white px-4 py-1 rounded-sm hover:bg-brand-navy cursor-pointer transition-colors">
                                            Chat
                                        </button>
                                    </div>
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
