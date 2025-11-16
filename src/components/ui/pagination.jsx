import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({
                        currentPage,
                        totalPages,
                        totalItems,
                        itemsPerPage,
                        onPageChange,
                        onItemsPerPageChange
                    }) => {
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderTop: '1px solid #E5E7EB',
            backgroundColor: 'white',
        },
        info: {
            fontSize: '14px',
            color: '#6B7280',
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        select: {
            padding: '6px 12px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'white',
            cursor: 'pointer',
            marginRight: '16px',
        },
        button: {
            padding: '6px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            backgroundColor: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
        },
        buttonDisabled: {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
        pageButton: {
            minWidth: '32px',
            height: '32px',
            padding: '6px 12px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
        },
        pageButtonActive: {
            backgroundColor: '#6366F1',
            borderColor: '#6366F1',
            color: 'white',
        },
    };

    const getPageNumbers = () => {
        const pages = [];
        const showPages = 5;

        if (totalPages <= showPages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div style={styles.container}>
            <div style={styles.info}>
                <span>Jami: <strong>{totalItems}</strong> ta</span>
                <span style={{ margin: '0 8px' }}>•</span>
                <span>Ko'rsatilmoqda: <strong>{startItem}-{endItem}</strong></span>
            </div>

            <div style={styles.controls}>
                <select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    style={styles.select}
                >
                    <option value={10}>10 ta</option>
                    <option value={20}>20 ta</option>
                    <option value={50}>50 ta</option>
                    <option value={100}>100 ta</option>
                </select>

                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    style={{
                        ...styles.button,
                        ...(currentPage === 1 ? styles.buttonDisabled : {}),
                    }}
                    onMouseEnter={(e) => {
                        if (currentPage !== 1) e.target.style.backgroundColor = '#F3F4F6';
                    }}
                    onMouseLeave={(e) => {
                        if (currentPage !== 1) e.target.style.backgroundColor = 'white';
                    }}
                    title="Birinchi sahifa"
                >
                    <ChevronsLeft size={16} />
                </button>

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        ...styles.button,
                        ...(currentPage === 1 ? styles.buttonDisabled : {}),
                    }}
                    onMouseEnter={(e) => {
                        if (currentPage !== 1) e.target.style.backgroundColor = '#F3F4F6';
                    }}
                    onMouseLeave={(e) => {
                        if (currentPage !== 1) e.target.style.backgroundColor = 'white';
                    }}
                    title="Oldingi"
                >
                    <ChevronLeft size={16} />
                </button>

                {getPageNumbers().map((page, idx) => (
                    page === '...' ? (
                        <span key={`ellipsis-${idx}`} style={{ padding: '0 8px', color: '#6B7280' }}>
              ...
            </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            style={{
                                ...styles.pageButton,
                                ...(currentPage === page ? styles.pageButtonActive : {}),
                            }}
                            onMouseEnter={(e) => {
                                if (currentPage !== page) {
                                    e.target.style.backgroundColor = '#F3F4F6';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentPage !== page) {
                                    e.target.style.backgroundColor = 'white';
                                }
                            }}
                        >
                            {page}
                        </button>
                    )
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                        ...styles.button,
                        ...(currentPage === totalPages ? styles.buttonDisabled : {}),
                    }}
                    onMouseEnter={(e) => {
                        if (currentPage !== totalPages) e.target.style.backgroundColor = '#F3F4F6';
                    }}
                    onMouseLeave={(e) => {
                        if (currentPage !== totalPages) e.target.style.backgroundColor = 'white';
                    }}
                    title="Keyingi"
                >
                    <ChevronRight size={16} />
                </button>

                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    style={{
                        ...styles.button,
                        ...(currentPage === totalPages ? styles.buttonDisabled : {}),
                    }}
                    onMouseEnter={(e) => {
                        if (currentPage !== totalPages) e.target.style.backgroundColor = '#F3F4F6';
                    }}
                    onMouseLeave={(e) => {
                        if (currentPage !== totalPages) e.target.style.backgroundColor = 'white';
                    }}
                    title="Oxirgi sahifa"
                >
                    <ChevronsRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;