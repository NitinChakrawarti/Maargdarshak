import React from 'react';

const ChatSkeleton = () => {
    return (
        <div className="animate-pulse w-full">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="ml-3">
                                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                                <div className="h-3 bg-gray-300 rounded w-32"></div>
                            </div>
                        </div>
                        <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatSkeleton;