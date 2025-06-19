import React from 'react';

const SkeletonBox = ({ className = "", children }) => (
    <div className={`animate-pulse ${className}`}>
        {children}
    </div>
);

const SkeletonLine = ({ width = "w-full", height = "h-4" }) => (
    <div className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded ${width} ${height}`} />
);

const SkeletonCircle = ({ size = "w-10 h-10" }) => (
    <div className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-full ${size}`} />
);

const SkeletonCard = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
        {children}
    </div>
);

const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            {/* Header Skeleton */}


            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section Skeleton */}
                <div className="mb-8">
                    <SkeletonBox>
                        <div className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded-3xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                            <div className="relative z-10 space-y-4">
                                <div className="h-10 bg-white/20 rounded-lg w-3/4" />
                                <div className="h-6 bg-white/15 rounded-lg w-5/6" />
                                <div className="flex items-center space-x-6 pt-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 bg-white/20 rounded" />
                                        <div className="h-5 bg-white/20 rounded w-24" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 bg-white/20 rounded" />
                                        <div className="h-5 bg-white/20 rounded w-32" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SkeletonBox>
                </div>
                <div className="mt-8">
                    <SkeletonCard className="p-6">
                        <SkeletonBox>
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
                                <SkeletonLine width="w-48" height="h-5" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    {/* Overall progress */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <SkeletonLine width="w-32" height="h-4" />
                                            <SkeletonLine width="w-12" height="h-4" />
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] h-3 rounded-full w-4/5" />
                                        </div>
                                    </div>
                                    {/* Individual course progress */}
                                    {[1, 2].map((item) => (
                                        <div key={item}>
                                            <div className="flex justify-between items-center mb-2">
                                                <SkeletonLine width="w-40" height="h-4" />
                                                <SkeletonLine width="w-8" height="h-4" />
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] h-2 rounded-full w-3/5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="text-center">
                                        <SkeletonBox>
                                            <div className="w-32 h-32 mx-auto mb-4 relative">
                                                <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-full border-8 border-gray-100" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <SkeletonLine width="w-12" height="h-8" />
                                                </div>
                                            </div>
                                            <SkeletonLine width="w-36" height="h-4" />
                                        </SkeletonBox>
                                    </div>
                                </div>
                            </div>
                        </SkeletonBox>
                    </SkeletonCard>
                </div>
                {/* Analytics Grid Skeleton */}
                
                {/* Recent Learning & Certificates Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Learning Skeleton */}
                    <SkeletonCard className="p-6">
                        <SkeletonBox>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
                                    <SkeletonLine width="w-32" height="h-5" />
                                </div>
                                <div className="bg-gray-100 px-3 py-1 rounded-full">
                                    <SkeletonLine width="w-16" height="h-3" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                {[1, 2].map((item) => (
                                    <div key={item} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center flex-1">
                                                <div className="w-3 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-full mr-2" />
                                                <SkeletonLine width="w-3/4" height="h-4" />
                                            </div>
                                            <div className="bg-gray-100 px-2 py-1 rounded-full ml-2">
                                                <SkeletonLine width="w-12" height="h-3" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <SkeletonLine width="w-full" height="h-3" />
                                            <div className="mt-1">
                                                <SkeletonLine width="w-4/5" height="h-3" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-1">
                                                <div className="w-3 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
                                                <SkeletonLine width="w-16" height="h-3" />
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <SkeletonLine width="w-16" height="h-3" />
                                                <div className="w-3 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SkeletonBox>
                    </SkeletonCard>

                    {/* Certificates Skeleton */}
                    <SkeletonCard className="p-6">
                        <SkeletonBox>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
                                    <SkeletonLine width="w-32" height="h-5" />
                                </div>
                                <div className="bg-gray-100 px-3 py-1 rounded-full">
                                    <SkeletonLine width="w-16" height="h-3" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center flex-1">
                                            <div className="w-4 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded mr-2" />
                                            <SkeletonLine width="w-2/3" height="h-4" />
                                        </div>
                                        <div className="bg-yellow-100 px-2 py-1 rounded-full ml-2">
                                            <SkeletonLine width="w-12" height="h-3" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <SkeletonLine width="w-4/5" height="h-3" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-3 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
                                            <SkeletonLine width="w-20" height="h-3" />
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <SkeletonLine width="w-16" height="h-3" />
                                            <div className="w-3 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SkeletonBox>
                    </SkeletonCard>
                </div>

                {/* Progress Visualization Skeleton */}

            </main>

            <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
        </div>
    );
};

export default DashboardSkeleton;