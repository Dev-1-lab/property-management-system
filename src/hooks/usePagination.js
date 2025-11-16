import { useState, useEffect } from 'react';

/**
 * Universal pagination hook
 * Barcha table componentlar uchun
 */
export const usePagination = (data, initialItemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const [paginatedData, setPaginatedData] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedData(data.slice(startIndex, endIndex));
    }, [data, currentPage, itemsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (perPage) => {
        setItemsPerPage(perPage);
        setCurrentPage(1); // Reset to first page
    };

    const resetPagination = () => {
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return {
        currentPage,
        itemsPerPage,
        paginatedData,
        totalPages,
        totalItems: data.length,
        handlePageChange,
        handleItemsPerPageChange,
        resetPagination,
    };
};

export default usePagination;