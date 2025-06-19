import React, { useEffect } from 'react';
import {
    MessageCircle,
    Mail,
    Phone,
    Globe,
    Calendar,
    CheckCircle,
    User,
    Briefcase,
    Clock,
    Star
} from 'lucide-react';
import Layout from '../../layout/auth/layout';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GetMentorById, IntializeChat } from '../../api';
import { useSelector } from 'react-redux';
import Layoutcomponent from '../../layout/landing/layoutcomponent';


const MentorProfile = () => {
    const [mentorData, setMentorData] = React.useState();

    const navigate = useNavigate();
    const location = useLocation();
    const mentorId = location.pathname.split('/').pop();
    const { data } = useSelector((state) => state.auth);
    const [loading, setLoading] = React.useState(false);

    const handleChat = async (mentorId) => {
        try {
            setLoading(true);
            const response = await IntializeChat({ userId1: mentorId, userId2: data._id });
            if (response.status === 200) {
                navigate("/chat");
            } else {
                console.error("Error initiating chat", response.data.message);
            }
        } catch (error) {
            console.error("Chat initiation failed", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchMentorData = async () => {
            const response = await GetMentorById(mentorId);
            if (response.status === 200) {
                setMentorData(response.data.data);
            }
        }
        fetchMentorData()
    }, [mentorId]);


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const mentorContent = (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-brand-navy to-light-blue rounded-xl p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Profile Image */}
                    <div className="relative">
                        <img
                            src={mentorData?.profile}
                            alt={mentorData?.name}
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        {mentorData?.isverified && (
                            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 text-center md:text-left text-white">
                        <h1 className="text-3xl font-bold mb-2">{mentorData?.name}</h1>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                            <User className="w-5 h-5" />
                            <span className="text-lg capitalize">{mentorData?.role}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <div className='flex items-center gap-2'>
                                <span className="">Joined </span>
                                <span className="font-medium">{formatDate(mentorData?.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Button */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() =>
                                data?._id ? handleChat(mentorData?._id) : navigate('/signup')
                            }
                            className="bg-white text-brand-navy hover:bg-blue-50 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-102 cursor-pointer"
                        >
                            <MessageCircle className="w-5 h-5" />
                            {loading ? 'Loading...' : 'Chat Now'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-brand-navy" />
                            Contact Information
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <a
                                    href={`mailto:${mentorData?.email}`}
                                    className="text-brand-navy hover:underline"
                                >
                                    {mentorData?.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <a
                                    href={`tel:${mentorData?.mobile}`}
                                    className="text-brand-navy hover:underline"
                                >
                                    +91 {mentorData?.mobile}
                                </a>
                            </div>
                            {mentorData?.social.length > 0 && (
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-gray-500" />
                                    <div className="flex flex-wrap gap-2">
                                        {mentorData?.social.map((link, index) => (
                                            <a
                                                key={index}
                                                href={`https://${link}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-brand-navy hover:underline text-sm"
                                            >
                                                {link}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Professional Details */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-brand-navy" />
                            Professional Details
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700">
                                    <strong>{mentorData?.experience} years</strong> of experience
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Star className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700">Specializes in:</span>
                            </div>
                            <div className="flex flex-wrap gap-2 ml-7">
                                {mentorData?.domains.map((domain, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                    >
                                        {domain.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">

                    {/* Quick Stats */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-white rounded-lg">
                                <div className="text-2xl font-bold text-brand-navy">
                                    {mentorData?.experience}
                                </div>
                                <div className="text-sm text-gray-600">Years Experience</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg">
                                <div className="text-2xl font-bold text-green-600">
                                    {mentorData?.domains.length}
                                </div>
                                <div className="text-sm text-gray-600">Specializations</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">
                                    {mentorData?.isverified ? '✓' : '✗'}
                                </div>
                                <div className="text-sm text-gray-600">Verified</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg">
                                <div className="text-2xl font-bold text-orange-600">
                                    {mentorData?.status === 'active' ? '●' : '○'}
                                </div>
                                <div className="text-sm text-gray-600">Status</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                    <button
                        onClick={() =>
                            data?._id ? handleChat(mentorData?._id) : navigate('/signup')
                        }
                        className="bg-gradient-to-r from-light-blue to-brand-navy text-white px-12 py-4 rounded-full font-semibold text-lg hover:from-brand-navy hover:to-light-blue transition-colors duration-700 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-101 hover:duration-1000"
                    >
                        {loading ? 'Loading...' : 'Start Your Mentorship Journey'}
                    </button>
                    <p className="text-gray-600 text-sm mt-2">
                        Connect with {mentorData?.name} and get expert guidance in {mentorData?.domains.join(', ')}
                    </p>
                </div>
            </div>
        </div>
    )

    return (
        data?._id ?

            (mentorData ? mentorContent : <div className="text-center text-gray-500">Loading mentor data...</div>)

            :
            <div className='pt-20 pb-8' >
                {mentorData ? mentorContent : <div className="text-center text-gray-500">Loading mentor data...</div>}
            </div>

    );
};

export default MentorProfile;