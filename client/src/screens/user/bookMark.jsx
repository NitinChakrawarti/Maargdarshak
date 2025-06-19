import { useSelector } from 'react-redux'
import Layout from '../../layout/auth/layout'
import { useEffect, useState } from 'react';
import { FetchFavorites } from '../../api';
import BookmarkGrid from '../../components/user/favouritegrid';
import Pagination from '../../components/pagination';
import FavouriteGridSkeleton from '../../components/skeleton/favouritgrid';

const BookMark = () => {
    const { user } = useSelector((state) => state.user);
    const [bookmarks, setBookmarks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);


    const fetchFavorites = async () => {
        const response = await FetchFavorites({ ids: user.savedItems, page: currentPage, limit: 1 });
        if (response.status === 200) {
            setLoading(false);
            setBookmarks(response.data.data.favorites);
            setTotalPages(response.data.data?.pagination.totalPages);
        } else {
            console.error("Error fetching bookmarks:", response.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchFavorites();
    }, [user.savedItems, currentPage]);

    const handleRemove = (id) => {
        // setBookmarks((prev) => prev.filter((b) => b._id !== id));

    };


    return (

        <div className='py-4 px-4 md:px-4 max-w-7xl mx-auto'>
            <div className="bg-gradient-to-br from-[#1e293b] via-[#1a3a6c] to-[#1e3a8a] rounded-lg px-8 py-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2c67a6]/20 via-[#0ea5e9]/20 to-[#3b82f6]/20 opacity-50"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#b5d5e5]/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#f7a35c]/30 rounded-full blur-xl"></div>
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold text-white mb-2">BookMarks</h1>
                    <p className="text-[#b5d5e5] mb-6">List of Content Saved for later Learnings </p>
                </div>
            </div>
            <div className='px-2 '>
                {
                    bookmarks.length === 0 && !loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-navy-blue">No Bookmarks Found</p>
                        </div>
                    ) : loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                            {
                                Array.from({ length: 3 }).map((_, index) => (
                                    <FavouriteGridSkeleton key={index} />
                                ))
                            }
                        </div>
                    ) : (
                        <BookmarkGrid
                            bookmarks={bookmarks}
                            onRemove={handleRemove}
                        />
                    )}
            </div>
            {
                totalPages >= 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )
            }
        </div>

    )
}

export default BookMark