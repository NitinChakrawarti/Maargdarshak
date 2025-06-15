import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BookmarkGrid = ({ bookmarks, onRemove }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {bookmarks?.map((bookmark) => (
                <div
                    key={bookmark._id}
                    className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition relative group"
                >
                    <Link to={`${bookmark._id}`} className="text-xl font-semibold mb-2">{bookmark.title}</Link>
                    <p className="text-gray-600 my-3">{bookmark.description.slice(0, 100)}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {bookmark.domain.slice(0,3).map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click
                            onRemove(bookmark._id);
                        }}
                        className="absolute top-3 right-3 text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 cursor-pointer "
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default BookmarkGrid;


