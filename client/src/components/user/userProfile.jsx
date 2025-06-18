import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Shield, BookOpen, Bookmark, Edit3, Check, X, Edit, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { setAuth } from '../../redux/features/authSlice';
import { setUser } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';


const ProfileComponent = ({ user }) => {
    const [showCourses, setShowCourses] = useState(false);
    const [userData, setUserData] = useState(user || {});
    const dispatch = useDispatch();
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const { signOut } = useClerk();
    const handleLogout = async () => {
        await signOut();
        const logout = await LogOutFunc({ role: role });
        if (logout.status === 200) {
            dispatch(setAuth({ role: null, data: null }));
            dispatch(setUser({ user: null, isverified: false, savedItems: [] }));
            return navigate("/");
        }
        else {
            console.error("Logout failed:", logout.message);
        }
    };


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save to backend
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({
            name: userData.name,
            email: userData.email,
            mobile: userData.mobile
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Main Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r relative to-brand-blue from-brand-navy px-6 sm:px-8 py-8">
                        <button
                            onClick={handleLogout}
                            className="absolute bottom-4 text-bg right-4 transition-colors">
                            <LogOut size={20} />
                        </button>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    {
                                        userData?.profile ? (
                                            <img src={userData.profile} alt="Profile" className="w-20 h-20 sm:w-16 sm:h-16 rounded-full" />
                                        ) : (
                                            <User className="w-12 h-12 sm:w-16 sm:h-16 text-brand-navy" />
                                        )}
                                </div>
                                <div className="absolute cursor-pointer bottom-2 -right-0 bg-brand-navy rounded-full p-2 shadow-lg">
                                    <Edit className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="text-center sm:text-left flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                                    {(
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white">{userData.name}</h2>
                                    )}


                                </div>
                                <p className="text-white/80 mb-4">Member since {formatDate(userData.createdAt || new Date())}</p>

                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="py-2 px-6 sm:py-4 sm:px-8">
                        {/* Contact Information */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-brand-blue" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    {(
                                        <p className="text-gray-800 font-medium">{userData.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Mobile Number</p>
                                    {(
                                        <p className="text-gray-800 font-medium">{userData.mobile || "Not provided"}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-6 sm:px-8 pb-6'>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Domains</h3>
                        <div className="flex flex-wrap items-center gap-2 p-4 mb-4 bg-gray-50 rounded-xl">
                            {
                                userData.domains?.length > 0 ? (
                                    userData.domains.map((domain, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                            {domain}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500">No domains provided</span>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Courses Accordion */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <button
                        onClick={() => setShowCourses(!showCourses)}
                        className="w-full flex items-center justify-between text-left p-5 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-brand-blue" />
                            <span className="text-lg font-semibold text-gray-800">
                                Enrolled Courses ({userData.courses?.length || 0})
                            </span>
                        </div>
                        {showCourses ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                    </button>

                    {/* Courses List */}
                    {showCourses && (
                        <div className="px-5 py-4">
                            <div className="space-y-3">
                                {userData.courses?.length > 0 ? (
                                    userData.courses.map((course, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center">
                                            <span className='rounded-full w-8 h-8 text-white flex items-center justify-center bg-brand-navy'>{index + 1}</span>
                                            <div className='flex w-full justify-between items-center gap-2 ml-4'>
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-800">{course.courseName}</h4>
                                                    <p className="text-gray-500 text-sm line-clamp-1">{course.description}</p>
                                                </div>
                                                <Link
                                                    to={`/user/resources/${course.courseId}`}
                                                    className="bg-brand-blue text-white px-4 py-1.5 rounded-lg hover:bg-brand-navy transition-colors"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-gray-500">
                                        You haven't enrolled in any courses yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;