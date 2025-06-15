
export const paginate = (totalItems, currentPage, limit) => {
    const totalPages = Math.ceil(totalItems / limit);
    return {
        totalItems,
        currentPage,
        totalPages,
        skip: (currentPage - 1) * limit
    };
};
