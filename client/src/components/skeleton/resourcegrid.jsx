const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-2xl shadow p-4 space-y-4">
      <div className="h-40 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="h-10 bg-gray-200 rounded w-full mt-2" />
    </div>
  );

  export default SkeletonCard