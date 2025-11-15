import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, Eye, Edit, Check, X } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { USER_ROLES } from '../../../utils/constants';
import StatusBadge from '../components/StatusBadge';
import ItemModal from '../components/ItemModal';
import ItemViewModal from '../components/ItemViewModal';

// Full detailed mock data (compatible with ViewItemModal)
const mockItems = [
    {
        id: 1,
        name: 'Noutbuk Lenovo ThinkPad X1',
        type: 'Elektronika',
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
        type: 'Elektronika',
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
        type: 'Mebel',
        status: 'YARATILGAN',
        createdAt: '2025-11-04',
        investigator: 'Sodiqov Botir',

        olibQoyish: {
            dalolatnoma: "OQD-12/2025",
            dalolatnomaSana: "2025-03-11",
            molMulkNomi: "Ofis kreslosi",
            oichovBirligi: "dona",
            soni: 1
        }
    }
];

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewItem, setViewItem] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        dateFrom: '',
        dateTo: '',
    });

    const { user } = useAuth();
    const canEdit = [USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR].includes(user?.role);
    const canConfirm = user?.role === USER_ROLES.TASDIQLOVCHI;

    useEffect(() => {
        loadItems();
    }, [filters, searchTerm]);

    const loadItems = async () => {
        try {
            setLoading(true);
            let filteredItems = [...mockItems];

            // Apply search
            if (searchTerm) {
                filteredItems = filteredItems.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.investigator.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // Apply filters
            if (filters.status) {
                filteredItems = filteredItems.filter((item) => item.status === filters.status);
            }
            if (filters.type) {
                filteredItems = filteredItems.filter((item) => item.type === filters.type);
            }
            if (filters.dateFrom) {
                filteredItems = filteredItems.filter((item) => item.createdAt >= filters.dateFrom);
            }
            if (filters.dateTo) {
                filteredItems = filteredItems.filter((item) => item.createdAt <= filters.dateTo);
            }

            setItems(filteredItems);
        } catch (error) {
            console.error('Failed to load items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        // Check if item can be edited
        if (item.status === 'TASDIQLANGAN' || item.status === 'TUSHGAN_MABLAG') {
            alert('Bu mol-mulkni tahrirlash mumkin emas. Tasdiqlovchi tasdiqlagan yoki jarayon yakunlangan.');
            return;
        }
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleSave = async (data) => {
        try {
            if (selectedItem) {
                console.log('Updating item:', selectedItem.id, data);
            } else {
                console.log('Creating new item:', data);
            }
            setShowModal(false);
            loadItems();
        } catch (error) {
            console.error('Failed to save item:', error);
        }
    };

    const handleExport = async () => {
        try {
            // Excel format uchun CSV export
            const csvHeader = 'ID,Nomi,Turi,Holat,Sana,Tergovchi,Baholangan qiymat\n';
            const csvData = items.map(item =>
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
        } catch (error) {
            console.error('Failed to export:', error);
            alert('Export xatolik: ' + error.message);
        }
    };

    const handleApplyFilters = () => {
        console.log('Applying filters:', filters);
        setShowFilterModal(false);
        loadItems();
    };

    const handleResetFilters = () => {
        console.log('Resetting filters');
        setFilters({
            status: '',
            type: '',
            dateFrom: '',
            dateTo: '',
        });
    };

    const handleOpenFilterModal = () => {
        console.log('Opening filter modal');
        setShowFilterModal(true);
    };

    const styles = {
        container: {
            padding: '0',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
        },
        title: {
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#1F2937',
        },
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
        filterRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
        },
        searchContainer: {
            flex: 1,
            position: 'relative',
        },
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
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        thead: {
            backgroundColor: '#F3F4F6',
            borderBottom: '2px solid #E5E7EB',
        },
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
        actionButton: {
            padding: '4px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.2s',
        },
        loading: {
            display: 'flex',
            justifyContent: 'center',
            padding: '48px',
        },
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
            {/* Header */}
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

            {/* Filters */}
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
                        onClick={handleOpenFilterModal}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        <Filter size={20} />
                        <span>Filter</span>
                        {(filters.status || filters.type || filters.dateFrom || filters.dateTo) && (
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

            {/* Table */}
            <div style={styles.tableCard}>
                {loading ? (
                    <div style={styles.loading}>
                        <div style={styles.spinner} />
                    </div>
                ) : (
                    <table style={styles.table}>
                        <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>Nomi</th>
                            <th style={styles.th}>Turi</th>
                            <th style={styles.th}>Holati</th>
                            <th style={styles.th}>Sana</th>
                            <th style={styles.th}>Tergovchi</th>
                            <th style={styles.th}>Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ ...styles.td, textAlign: 'center', padding: '48px', color: '#6B7280' }}>
                                    Hech qanday ma'lumot topilmadi
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr
                                    key={item.id}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    <td style={{ ...styles.td, fontWeight: '500' }}>
                                        {item.name}
                                    </td>
                                    <td style={styles.td}>{item.type}</td>
                                    <td style={styles.td}>
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td style={styles.td}>{item.createdAt}</td>
                                    <td style={styles.td}>{item.investigator}</td>
                                    <td style={styles.td}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <button
                                                onClick={() => setViewItem(item)}
                                                style={styles.actionButton}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                title="Ko'rish"
                                            >
                                                <Eye size={16} color="#6B7280" />
                                            </button>

                                            {canEdit && (
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    style={styles.actionButton}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#EEF2FF'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                    title="Tahrirlash"
                                                >
                                                    <Edit size={16} color="#6366F1" />
                                                </button>
                                            )}

                                            {canConfirm && item.status === 'SAQLASHGA_YUBORILGAN' && (
                                                <button
                                                    style={styles.actionButton}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#D1FAE5'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                    title="Tasdiqlash"
                                                >
                                                    <Check size={16} color="#10B981" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modals */}
            {showModal && (
                <ItemModal
                    item={selectedItem}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}

            {viewItem && (
                <ItemViewModal
                    item={viewItem}
                    onClose={() => setViewItem(null)}
                />
            )}

            {/* Filter Modal */}
            {showFilterModal && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        zIndex: 50,
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowFilterModal(false);
                        }
                    }}
                >
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        width: '100%',
                        maxWidth: '500px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '24px',
                        }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>
                                Filtrlar
                            </h2>
                            <button
                                onClick={() => setShowFilterModal(false)}
                                style={{
                                    padding: '4px',
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <X size={24} color="#6B7280" />
                            </button>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '8px',
                            }}>
                                Holati
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '10px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="">Barchasi</option>
                                <option value="YARATILGAN">Yaratilgan</option>
                                <option value="EKSPERTIZA_KIRITILGAN">Ekspertiza kiritilgan</option>
                                <option value="SAQLASHGA_YUBORILGAN">Saqlashga yuborilgan</option>
                                <option value="TASDIQLANGAN">Tasdiqlangan</option>
                                <option value="MATERIALNI_SUDGA_TOPSHIRILGAN">Sudga topshirilgan</option>
                                <option value="SUD_QARORI_KIRITILGAN">Sud qarori kiritilgan</option>
                                <option value="TUSHGAN_MABLAG">Tushgan mablag'</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '8px',
                            }}>
                                Turi
                            </label>
                            <select
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '10px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="">Barchasi</option>
                                <option value="Elektronika">Elektronika</option>
                                <option value="Mebel">Mebel</option>
                                <option value="TRANSPORT">Transport</option>
                                <option value="QIMMATBAHO">Qimmatbaho</option>
                                <option value="BOSHQA">Boshqa</option>
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '8px',
                                }}>
                                    Dan
                                </label>
                                <input
                                    type="date"
                                    value={filters.dateFrom}
                                    onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '10px 16px',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '8px',
                                }}>
                                    Gacha
                                </label>
                                <input
                                    type="date"
                                    value={filters.dateTo}
                                    onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '10px 16px',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px',
                            marginTop: '24px',
                        }}>
                            <button
                                onClick={handleResetFilters}
                                style={{
                                    padding: '10px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    backgroundColor: 'white',
                                    color: '#374151',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#F9FAFB'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                            >
                                Tozalash
                            </button>
                            <button
                                onClick={handleApplyFilters}
                                style={{
                                    padding: '10px 16px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    backgroundColor: '#6366F1',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#4F46E5'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#6366F1'}
                            >
                                Qo'llash
                            </button>
                        </div>
                    </div>
                </div>
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