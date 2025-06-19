import React from 'react';

const MentorProfileSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100 animate-pulse">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Profile Image Skeleton */}
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200"></div>
                        <div className="absolute -bottom-2 -right-2 bg-gray-300 rounded-full p-2">
                            <div className="w-6 h-6 bg-gray-400 rounded"></div>
                        </div>
                    </div>

                    {/* Basic Info Skeleton */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="h-8 bg-gray-200 rounded mb-2 w-48 mx-auto md:mx-0"></div>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                            <div className="w-5 h-5 bg-gray-200 rounded"></div>
                            <div className="h-6 bg-gray-200 rounded w-24"></div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <div className="h-5 bg-gray-200 rounded w-16"></div>
                            <div className="h-5 bg-gray-200 rounded w-24"></div>
                        </div>
                    </div>

                    {/* Chat Button Skeleton */}
                    <div className="flex-shrink-0">
                        <div className="bg-gray-200 px-8 py-3 rounded-full h-12 w-32"></div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Contact Information Skeleton */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-gray-300 rounded"></div>
                            <div className="h-6 bg-gray-300 rounded w-40"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                <div className="h-5 bg-gray-300 rounded w-48"></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                <div className="h-5 bg-gray-300 rounded w-32"></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                <div className="h-5 bg-gray-300 rounded w-40"></div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Details Skeleton */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-gray-300 rounded"></div>
                            <div className="h-6 bg-gray-300 rounded w-36"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                <div className="h-5 bg-gray-300 rounded w-44"></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                <div className="h-5 bg-gray-300 rounded w-28"></div>
                            </div>
                            <div className="flex flex-wrap gap-2 ml-7">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="px-3 py-1 bg-gray-200 rounded-full h-6 w-20"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Quick Stats Skeleton */}
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6">
                        <div className="h-6 bg-gray-300 rounded w-24 mb-4"></div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="text-center p-4 bg-white rounded-lg">
                                    <div className="h-8 bg-gray-300 rounded w-8 mx-auto mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Action Skeleton */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                    <div className="bg-gray-300 px-12 py-4 rounded-full h-14 w-80 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
                </div>
            </div>
        </div>
    );
};

export default MentorProfileSkeleton;