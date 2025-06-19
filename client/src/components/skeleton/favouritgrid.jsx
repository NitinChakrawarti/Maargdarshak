const FavouriteGridSkeleton = () => {
    return (
        <div className="bg-white shadow-md rounded-2xl p-5 animate-pulse">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded-md mb-2 w-3/4"></div>

            {/* Description skeleton */}
            <div className="space-y-2 my-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-2 mb-2">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-12"></div>
                <div className="h-6 bg-gray-200 rounded-full w-14"></div>
            </div>

            {/* Remove button skeleton */}
            <div className="absolute top-3 right-3 h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
    );
};

export default FavouriteGridSkeleton;