
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-end space-x-2 my-4">
            <button
                className={`px-3 py-1 rounded-md text-sm font-medium 
                            ${currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-brand-navy cursor-pointer text-white hover:bg-navy-700 transition-colors'}`}
                disabled={currentPage === 1}
                onClick={() => handlePageClick(currentPage - 1)}
            >
                Previous
            </button>

            {pageNumbers.map(number => (
                <button
                    key={number}
                    className={`w-8 h-8 rounded-md text-sm font-medium  cursor-pointer transition-colors
                                ${currentPage === number
                            ? 'bg-brand-navy  text-white'
                            : 'bg-white text-navy-800 border border-gray-300 hover:bg-blue-100'}`}
                    onClick={() => handlePageClick(number)}
                >
                    {number}
                </button>
            ))}

            <button
                className={`px-3 py-1 rounded-md text-sm font-medium 
                            ${currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-brand-navy cursor-pointer text-white hover:bg-navy-700 transition-colors'}`}
                disabled={currentPage === totalPages}
                onClick={() => handlePageClick(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;