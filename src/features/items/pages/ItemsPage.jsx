import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, ChevronRight } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { USER_ROLES } from '../../../utils/constants';
import StatusBadge from '../components/StatusBadge';
import ItemModal from '../components/ItemModal';
import Pagination from '../../../components/ui/Pagination';
import { useToast } from '../../../components/ui/Toast';
import { useNavigate } from 'react-router-dom';

// Mock data
const mockItems = [
    {
        id: 1,
        name: 'Noutbuk Lenovo ThinkPad X1',
        caseNumber: 'JY-2025/123',
        caseName: 'Korrupsiya ishi - Toshkent shahar hokimligi',
        seizureProtocol: 'OQD-45/2025',
        type: 'Elektronika',
        unit: 'dona',
        quantity: 1,
        status: 'TUSHGAN_MABLAG',
        createdAt: '2025-11-01',
        investigator: 'Aliyev Jasur',
        location: '2-ombor',
        description: 'Ishchi holatda, barcha aksessuarlar mavjud',

        olibQoyish: {
            dalolatnoma: "OQD-45/2025",
            dalolatnomaSana: "2025-01-12",
            molMulkNomi: "Noutbuk Lenovo ThinkPad X1",
            oichovBirligi: "dona",
            soni: 1
        },

        expertise: {
            date: "2025-01-15",
            organization: "Markaziy ekspertiza bo'limi",
            result: "Texnik tekshiruvdan o'tdi. Ishchi holatda.",
            estimatedValue: "7,000,000",
            notes: "Barcha texnik parametrlar me'yorida"
        },

        baholash: {
            hisobotSana: "2025-01-16",
            hisobotNumber: "BH-55/25",
            bahosi: 7000000,
            summasi: 7000000
        },

        storageConfirmation: {
            date: "2025-01-17",
            confirmedBy: "S.Toshmatov",
            note: "Mol-mulk yaxshi holatda qabul qilindi"
        },

        saqlash: {
            hujjatSana: "2025-01-17",
            hujjatNumber: "SJ-12/25",
            tashkilotNomi: "Bozor Sabzavot Ombori №2"
        },

        materialSubmission: {
            date: "2025-01-20",
            organization: "Toshkent shahar sudi",
            receivedBy: "Sudya Rahmonov A.",
            documentNumber: "MAT-2025-456",
            notes: "Barcha hujjatlar to'liq topshirildi"
        },

        sudgaTopshirish: {
            sana: "2025-01-20",
            hujjat: "Dalolatnoma",
            number: "ST-44/25",
            soni: 1
        },

        decision: {
            type: "SUD",
            number: "S-456/2025",
            date: "2025-02-05",
            result: "DAVLAT_DAROMADIGA",
            organization: "Toshkent shahar sudi",
            notes: "Davlat daromadiga o'tkaziladi"
        },

        sudQarori: {
            egasigaQaytarildi: { soni: 0, summasi: 0, number: null, sana: null },
            davlatDaromadiga: { soni: 1, summasi: 7000000, number: "DD-99/25", sana: "2025-02-05" },
            yoqQilindi: { soni: 0, summasi: 0, number: null, sana: null },
            ijrochigaTopshirildi: { soni: 0, summasi: 0, number: null, sana: null },
        },

        revenue: {
            amount: "7,000,000",
            date: "2025-02-10",
            account: "Davlat byudjeti",
            reference: "TRX-2025-001",
            notes: "To'liq qiymat davlat byudjetiga o'tkazildi"
        },

        tushganMablag: {
            hammasi: 7000000,
            mahalliyBudjet: 4000000
        }
    },

    {
        id: 2,
        name: 'Proyektor Epson X500',
        caseNumber: 'JY-2025/087',
        caseName: 'Davlat mulkini o\'zlashtirish',
        seizureProtocol: 'OQD-83/2025',
        type: 'Elektronika',
        unit: 'dona',
        quantity: 1,
        status: 'TASDIQLANGAN',
        createdAt: '2025-10-21',
        investigator: 'Karimova Nigora',
        location: '1-ombor',

        olibQoyish: {
            dalolatnoma: "OQD-83/2025",
            dalolatnomaSana: "2025-02-01",
            molMulkNomi: "Proyektor Epson X500",
            oichovBirligi: "dona",
            soni: 1
        },

        expertise: {
            date: "2025-02-04",
            organization: "Elektronika ekspertizasi",
            result: "Ishchi holatda",
            estimatedValue: "4,500,000",
            notes: "Lampalar yangi almashtirilgan"
        },

        baholash: {
            hisobotSana: "2025-02-05",
            hisobotNumber: "BH-88/25",
            bahosi: 4500000,
            summasi: 4500000
        },

        storageConfirmation: {
            date: "2025-02-06",
            confirmedBy: "S.Toshmatov",
            note: "Qabul qilindi"
        },

        saqlash: {
            hujjatSana: "2025-02-06",
            hujjatNumber: "SJ-88/25",
            tashkilotNomi: "Tuman Moliya Bo'limi Ombori"
        },

        sudgaTopshirish: {
            sana: "2025-02-08",
            hujjat: "Dalolatnoma",
            number: "ST-78/25",
            soni: 1
        },

        sudQarori: {
            egasigaQaytarildi: { soni: 1, summasi: 0, number: "EQ-22/25", sana: "2025-03-01" },
            davlatDaromadiga: { soni: 0, summasi: 0, number: null, sana: null },
            yoqQilindi: { soni: 0, summasi: 0, number: null, sana: null },
            ijrochigaTopshirildi: { soni: 0, summasi: 0, number: null, sana: null },
        },

        tushganMablag: {
            hammasi: 0,
            mahalliyBudjet: 0
        }
    },

    {
        id: 3,
        name: 'Ofis kreslosi',
        caseNumber: 'JY-2025/156',
        caseName: 'Firibgarlik - Olmazor tumani',
        seizureProtocol: 'OQD-12/2025',
        type: 'Mebel',
        unit: 'dona',
        quantity: 5,
        status: 'YARATILGAN',
        createdAt: '2025-11-04',
        investigator: 'Sodiqov Botir',

        olibQoyish: {
            dalolatnoma: "OQD-12/2025",
            dalolatnomaSana: "2025-03-11",
            molMulkNomi: "Ofis kreslosi",
            oichovBirligi: "dona",
            soni: 5
        }
    }
];

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        caseNumber: '',
        dateFrom: '',
        dateTo: '',
    });

    const { user } = useAuth();
    const { showSuccess, showError, showWarning, showInfo } = useToast();
    const navigate = useNavigate();
    const canEdit = [USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR].includes(user?.role);

    useEffect(() => {
        loadItems();
    }, [filters, searchTerm, currentPage, itemsPerPage]);

    const loadItems = async () => {
        try {
            setLoading(true);
            let filteredItems = [...mockItems];

            if (searchTerm) {
                filteredItems = filteredItems.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.investigator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.caseNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.caseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.seizureProtocol?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (filters.status) {
                filteredItems = filteredItems.filter((item) => item.status === filters.status);
            }
            if (filters.type) {
                filteredItems = filteredItems.filter((item) => item.type === filters.type);
            }
            if (filters.caseNumber) {
                filteredItems = filteredItems.filter((item) =>
                    item.caseNumber?.toLowerCase().includes(filters.caseNumber.toLowerCase())
                );
            }
            if (filters.dateFrom) {
                filteredItems = filteredItems.filter((item) => item.createdAt >= filters.dateFrom);
            }
            if (filters.dateTo) {
                filteredItems = filteredItems.filter((item) => item.createdAt <= filters.dateTo);
            }

            setAllItems(filteredItems);

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedItems = filteredItems.slice(startIndex, endIndex);

            setItems(paginatedItems);
        } catch (error) {
            console.error('Failed to load items:', error);
            showError('Ma\'lumotlarni yuklashda xatolik yuz berdi');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setShowModal(true);
    };

    const handleRowClick = (item) => {
        navigate(`/items/${item.id}`);
    };

    const handleSave = async (data) => {
        try {
            if (selectedItem) {
                showSuccess('Mol-mulk muvaffaqiyatli yangilandi');
            } else {
                showSuccess('Yangi mol-mulk qo\'shildi');
            }
            setShowModal(false);
            loadItems();
        } catch (error) {
            showError('Saqlashda xatolik yuz berdi');
        }
    };

    const handleExport = async () => {
        try {
            const csvHeader = 'ID,Nomi,Turi,Holat,Sana,Tergovchi,Baholangan qiymat\n';
            const csvData = allItems.map(item =>
                `${item.id},${item.name},${item.type},${item.status},${item.createdAt},${item.investigator},${item.expertise?.estimatedValue || 'N/A'}`
            ).join('\n');

            const csvContent = csvHeader + csvData;
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `mol-mulk-${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            showSuccess('Ma\'lumotlar muvaffaqiyatli eksport qilindi');
        } catch (error) {
            showError('Eksport qilishda xatolik yuz berdi');
        }
    };

    const styles = {
        container: { padding: '0' },
        header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
        title: { fontSize: '30px', fontWeight: 'bold', color: '#1F2937' },
        button: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#6366F1',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
        },
        filterCard: {
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            marginBottom: '24px',
        },
        filterRow: { display: 'flex', alignItems: 'center', gap: '16px' },
        searchContainer: { flex: 1, position: 'relative' },
        searchIcon: {
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9CA3AF',
        },
        searchInput: {
            width: '100%',
            paddingLeft: '40px',
            paddingRight: '16px',
            paddingTop: '10px',
            paddingBottom: '10px',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
        },
        filterButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.2s',
        },
        tableCard: {
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
        },
        table: { width: '100%', borderCollapse: 'collapse' },
        thead: { backgroundColor: '#F3F4F6', borderBottom: '2px solid #E5E7EB' },
        th: {
            padding: '12px 24px',
            textAlign: 'left',
            fontSize: '12px',
            fontWeight: '500',
            color: '#6B7280',
            textTransform: 'uppercase',
        },
        td: {
            padding: '16px 24px',
            fontSize: '14px',
            color: '#1F2937',
            borderBottom: '1px solid #F3F4F6',
        },
        clickableRow: {
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        loading: { display: 'flex', justifyContent: 'center', padding: '48px' },
        spinner: {
            width: '32px',
            height: '32px',
            border: '3px solid #E5E7EB',
            borderTopColor: '#6366F1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Mol-mulk ro'yxati</h1>
                {canEdit && (
                    <button
                        onClick={handleCreate}
                        style={styles.button}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#4F46E5'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#6366F1'}
                    >
                        <Plus size={20} />
                        <span>Yangi qo'shish</span>
                    </button>
                )}
            </div>

            <div style={styles.filterCard}>
                <div style={styles.filterRow}>
                    <div style={styles.searchContainer}>
                        <Search size={20} style={styles.searchIcon} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Universal qidiruv..."
                            style={styles.searchInput}
                        />
                    </div>
                    <button
                        style={styles.filterButton}
                        onClick={() => setShowFilterModal(true)}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        <Filter size={20} />
                        <span>Filter</span>
                        {(filters.status || filters.type || filters.caseNumber || filters.dateFrom || filters.dateTo) && (
                            <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#EF4444',
                                marginLeft: '4px',
                            }} />
                        )}
                    </button>
                    <button
                        onClick={handleExport}
                        style={styles.filterButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        <Download size={20} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div style={styles.tableCard}>
                {loading ? (
                    <div style={styles.loading}>
                        <div style={styles.spinner} />
                    </div>
                ) : (
                    <table style={styles.table}>
                        <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>Ish yuritish raqami</th>
                            <th style={styles.th}>Nomi</th>
                            <th style={styles.th}>Miqdori</th>
                            <th style={styles.th}>Holati</th>
                            <th style={styles.th}>Sana</th>
                            <th style={styles.th}>Tergovchi</th>
                            <th style={styles.th}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ ...styles.td, textAlign: 'center', padding: '48px', color: '#6B7280' }}>
                                    Hech qanday ma'lumot topilmadi
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr
                                    key={item.id}
                                    style={styles.clickableRow}
                                    onClick={() => handleRowClick(item)}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    <td style={styles.td}>
                                        <div style={{ fontWeight: '600', color: '#6366F1' }}>
                                            {item.caseNumber}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                                            {item.caseName}
                                        </div>
                                    </td>
                                    <td style={{ ...styles.td, fontWeight: '500' }}>
                                        <div>{item.name}</div>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                                            {item.type} • {item.seizureProtocol}
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={{ fontWeight: '600' }}>{item.quantity}</span> {item.unit}
                                    </td>
                                    <td style={styles.td}>
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td style={styles.td}>{item.createdAt}</td>
                                    <td style={styles.td}>{item.investigator}</td>
                                    <td style={styles.td}>
                                        <ChevronRight size={20} color="#9CA3AF" />
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                )}

                {!loading && items.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(allItems.length / itemsPerPage)}
                        totalItems={allItems.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={(page) => setCurrentPage(page)}
                        onItemsPerPageChange={(perPage) => {
                            setItemsPerPage(perPage);
                            setCurrentPage(1);
                        }}
                    />
                )}
            </div>

            {showModal && (
                <ItemModal
                    item={selectedItem}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default ItemsPage;