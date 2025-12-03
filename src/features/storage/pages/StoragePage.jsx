import React, { useState, useEffect } from 'react';
import { Package, Check, X, Upload, Eye, Clock, Ban } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import StatusBadge from '../../items/components/StatusBadge';
import Pagination from '../../../components/ui/Pagination';
import { useToast } from '../../../components/ui/Toast';

// Mock data - saqlashga yuborilgan mol-mulklar
const mockPendingItems = [
    {
        id: 1,
        name: 'Avtomobil Toyota Camry',
        type: 'TRANSPORT',
        status: 'SAQLASHGA_YUBORILGAN',
        createdAt: '2025-11-10',
        investigator: 'A.Karimov',
        location: '1-ombor',
        expectedArrival: '2025-11-15',
    },
    {
        id: 2,
        name: 'Noutbuk Dell',
        type: 'ELEKTRONIKA',
        status: 'SAQLASHGA_YUBORILGAN',
        createdAt: '2025-11-12',
        investigator: 'B.Rahimov',
        location: '2-ombor',
        expectedArrival: '2025-11-16',
    },
    {
        id: 3,
        name: 'Oltin ziynet buyumlari',
        type: 'QIMMATBAHO',
        status: 'SAQLASHGA_YUBORILGAN',
        createdAt: '2025-11-13',
        investigator: 'A.Karimov',
        location: '1-ombor',
        expectedArrival: '2025-11-17',
    },
];

const StoragePage = () => {
    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [confirmedItems, setConfirmedItems] = useState([]);
    const [rejectedItems, setRejectedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [confirmNote, setConfirmNote] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const [confirmFile, setConfirmFile] = useState(null);
    const [confirmDocDate, setConfirmDocDate] = useState(new Date().toISOString().split('T')[0]);
    const [confirmDocNumber, setConfirmDocNumber] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { user } = useAuth();
    const { showSuccess, showError } = useToast();

    useEffect(() => {
        loadPendingItems();
        loadConfirmedItems();
        loadRejectedItems();
    }, [currentPage, itemsPerPage]);

    const loadPendingItems = async () => {
        try {
            setLoading(true);
            setTimeout(() => {
                setAllItems(mockPendingItems);

                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const paginatedItems = mockPendingItems.slice(startIndex, endIndex);

                setItems(paginatedItems);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Failed to load items:', error);
            showError('Ma\'lumotlarni yuklashda xatolik');
            setLoading(false);
        }
    };

    const loadConfirmedItems = async () => {
        // Mock confirmed items
        const mockConfirmed = [
            {
                id: 101,
                name: 'Televizor Samsung',
                type: 'ELEKTRONIKA',
                status: 'TASDIQLANGAN',
                confirmedAt: '2025-11-14',
                investigator: 'C.Saidov',
                location: '1-ombor',
            }
        ];
        setConfirmedItems(mockConfirmed);
    };

    const loadRejectedItems = async () => {
        // Mock rejected items
        const mockRejected = [
            {
                id: 201,
                name: 'Telefon iPhone',
                type: 'ELEKTRONIKA',
                status: 'RAD_ETILGAN',
                rejectedAt: '2025-11-13',
                investigator: 'D.Azimov',
                location: '2-ombor',
                rejectReason: 'Hujjatlar to\'liq emas'
            }
        ];
        setRejectedItems(mockRejected);
    };

    const handleConfirm = (item) => {
        setSelectedItem(item);
        setConfirmDocDate(new Date().toISOString().split('T')[0]);
        setConfirmDocNumber('');
        setConfirmNote('');
        setConfirmFile(null);
        setShowConfirmModal(true);
    };

    const handleReject = (item) => {
        setSelectedItem(item);
        setRejectReason('');
        setShowRejectModal(true);
    };

    const handleSaveConfirmation = async () => {
        try {
            if (!confirmDocDate || !confirmDocNumber) {
                showError('Hujjat sanasi va raqamini kiriting!');
                return;
            }

            console.log('Confirming item:', selectedItem.id, {
                docDate: confirmDocDate,
                docNumber: confirmDocNumber,
                note: confirmNote,
                file: confirmFile,
            });

            // Remove confirmed item from pending list
            const updatedItems = allItems.filter(item => item.id !== selectedItem.id);
            setAllItems(updatedItems);

            // Add to confirmed items
            const confirmedItem = {
                ...selectedItem,
                status: 'TASDIQLANGAN',
                confirmedAt: new Date().toISOString().split('T')[0],
                confirmDocDate,
                confirmDocNumber,
                confirmNote,
                confirmFile
            };
            setConfirmedItems(prev => [...prev, confirmedItem]);

            // Update paginated items
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setItems(updatedItems.slice(startIndex, endIndex));

            setShowConfirmModal(false);
            setSelectedItem(null);
            setConfirmNote('');
            setConfirmFile(null);
            setConfirmDocDate(new Date().toISOString().split('T')[0]);
            setConfirmDocNumber('');

            showSuccess('Mol-mulk muvaffaqiyatli tasdiqlandi');
        } catch (error) {
            console.error('Failed to confirm:', error);
            showError('Tasdiqlashda xatolik yuz berdi');
        }
    };

    const handleSaveRejection = async () => {
        try {
            if (!rejectReason) {
                showError('Rad etish sababini kiriting!');
                return;
            }

            console.log('Rejecting item:', selectedItem.id, {
                reason: rejectReason,
            });

            // Remove rejected item from pending list
            const updatedItems = allItems.filter(item => item.id !== selectedItem.id);
            setAllItems(updatedItems);

            // Add to rejected items
            const rejectedItem = {
                ...selectedItem,
                status: 'RAD_ETILGAN',
                rejectedAt: new Date().toISOString().split('T')[0],
                rejectReason
            };
            setRejectedItems(prev => [...prev, rejectedItem]);

            // Update paginated items
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setItems(updatedItems.slice(startIndex, endIndex));

            setShowRejectModal(false);
            setSelectedItem(null);
            setRejectReason('');

            showSuccess('Mol-mulk rad etildi');
        } catch (error) {
            console.error('Failed to reject:', error);
            showError('Rad etishda xatolik yuz berdi');
        }
    };

    const getStats = () => {
        return {
            pending: allItems.length,
            confirmed: confirmedItems.length,
            rejected: rejectedItems.length,
            total: allItems.length + confirmedItems.length + rejectedItems.length
        };
    };

    const stats = getStats();

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
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '24px',
        },
        statCard: {
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '24px',
        },
        statHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
        },
        statIcon: {
            padding: '12px',
            borderRadius: '8px',
        },
        statLabel: {
            fontSize: '14px',
            color: '#6B7280',
            marginBottom: '4px',
        },
        statValue: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1F2937',
        },
        card: {
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
            backgroundColor: '#F9FAFB',
            borderBottom: '1px solid #E5E7EB',
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
        button: {
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        confirmButton: {
            backgroundColor: '#10B981',
            color: 'white',
        },
        rejectButton: {
            backgroundColor: '#EF4444',
            color: 'white',
        },
        modal: {
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 50,
        },
        modalContent: {
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '100%',
            maxWidth: '500px',
        },
        modalHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
        },
        modalTitle: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1F2937',
        },
        formGroup: {
            marginBottom: '16px',
        },
        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px',
        },
        input: {
            width: '100%',
            padding: '10px 16px',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
            fontSize: '14px',
        },
        textarea: {
            width: '100%',
            padding: '10px 16px',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
            fontSize: '14px',
            minHeight: '120px',
            resize: 'vertical',
        },
        fileUpload: {
            border: '2px dashed #D1D5DB',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center',
            cursor: 'pointer',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '24px',
        },
        grid2: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
        },
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>Saqlash tasdiqlash</h1>
            </div>

            {/* Stats */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                        <div>
                            <p style={styles.statLabel}>Tasdiqlash kutilmoqda</p>
                            <p style={styles.statValue}>{stats.pending}</p>
                        </div>
                        <div style={{ ...styles.statIcon, backgroundColor: '#FEF3C7' }}>
                            <Clock size={24} color="#F59E0B" />
                        </div>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                        <div>
                            <p style={styles.statLabel}>Tasdiqlanganlar</p>
                            <p style={styles.statValue}>{stats.confirmed}</p>
                        </div>
                        <div style={{ ...styles.statIcon, backgroundColor: '#D1FAE5' }}>
                            <Check size={24} color="#10B981" />
                        </div>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                        <div>
                            <p style={styles.statLabel}>Rad etilganlar</p>
                            <p style={styles.statValue}>{stats.rejected}</p>
                        </div>
                        <div style={{ ...styles.statIcon, backgroundColor: '#FEE2E2' }}>
                            <Ban size={24} color="#EF4444" />
                        </div>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                        <div>
                            <p style={styles.statLabel}>Jami</p>
                            <p style={styles.statValue}>{stats.total}</p>
                        </div>
                        <div style={{ ...styles.statIcon, backgroundColor: '#DBEAFE' }}>
                            <Package size={24} color="#3B82F6" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div style={styles.card}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            border: '3px solid #E5E7EB',
                            borderTopColor: '#6366F1',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                        }} />
                    </div>
                ) : (
                    <table style={styles.table}>
                        <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>Mol-mulk nomi</th>
                            <th style={styles.th}>Turi</th>
                            <th style={styles.th}>Tergovchi</th>
                            <th style={styles.th}>Saqlash joyi</th>
                            <th style={styles.th}>Kutilayotgan sana</th>
                            <th style={styles.th}>Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ ...styles.td, textAlign: 'center', padding: '48px', color: '#6B7280' }}>
                                    Tasdiqlash uchun mol-mulk yo'q
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id} style={{ cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                    <td style={styles.td}>
                                        <div style={{ fontWeight: '500' }}>{item.name}</div>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                                            ID: {item.id}
                                        </div>
                                    </td>
                                    <td style={styles.td}>{item.type}</td>
                                    <td style={styles.td}>{item.investigator}</td>
                                    <td style={styles.td}>{item.location}</td>
                                    <td style={styles.td}>{item.expectedArrival}</td>
                                    <td style={styles.td}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={() => handleConfirm(item)}
                                                style={{ ...styles.button, ...styles.confirmButton }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
                                            >
                                                <Check size={16} />
                                                Tasdiqlash
                                            </button>
                                            <button
                                                onClick={() => handleReject(item)}
                                                style={{ ...styles.button, ...styles.rejectButton }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#DC2626'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#EF4444'}
                                            >
                                                <Ban size={16} />
                                                Rad etish
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                )}

                {/* Pagination */}
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

            {/* Confirmation Modal */}
            {showConfirmModal && selectedItem && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Mol-mulkni tasdiqlash</h2>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                style={{ padding: '4px', cursor: 'pointer', border: 'none', background: 'none' }}
                            >
                                <X size={24} color="#6B7280" />
                            </button>
                        </div>

                        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                {selectedItem.name}
                            </h3>
                            <p style={{ fontSize: '14px', color: '#6B7280' }}>
                                Tergovchi: {selectedItem.investigator} • Saqlash: {selectedItem.location}
                            </p>
                        </div>

                        {/* Hujjat ma'lumotlari */}
                        <div style={styles.grid2}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Hujjat sanasi *</label>
                                <input
                                    type="date"
                                    value={confirmDocDate}
                                    onChange={(e) => setConfirmDocDate(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Hujjat raqami *</label>
                                <input
                                    type="text"
                                    value={confirmDocNumber}
                                    onChange={(e) => setConfirmDocNumber(e.target.value)}
                                    style={styles.input}
                                    placeholder="Masalan: T-2025-001"
                                />
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Eslatma (ixtiyoriy)</label>
                            <textarea
                                value={confirmNote}
                                onChange={(e) => setConfirmNote(e.target.value)}
                                style={styles.textarea}
                                placeholder="Mol-mulk holati, xususiyatlari va boshqa ma'lumotlar..."
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Tasdiqlash hujjati</label>
                            <div style={styles.fileUpload}>
                                <input
                                    type="file"
                                    onChange={(e) => setConfirmFile(e.target.files[0])}
                                    style={{ display: 'none' }}
                                    id="confirm-file"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />
                                <label htmlFor="confirm-file" style={{ cursor: 'pointer' }}>
                                    <Upload size={32} color="#9CA3AF" style={{ margin: '0 auto 8px' }} />
                                    <p style={{ fontSize: '14px', color: '#6B7280' }}>
                                        {confirmFile ? confirmFile.name : 'Hujjatni yuklash uchun bosing'}
                                    </p>
                                </label>
                            </div>
                        </div>

                        <div style={styles.buttonGroup}>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                style={{ ...styles.button, backgroundColor: '#F3F4F6', color: '#374151' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleSaveConfirmation}
                                style={{
                                    ...styles.button,
                                    ...styles.confirmButton,
                                    opacity: (!confirmDocDate || !confirmDocNumber) ? 0.6 : 1,
                                    cursor: (!confirmDocDate || !confirmDocNumber) ? 'not-allowed' : 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    if (confirmDocDate && confirmDocNumber) {
                                        e.target.style.backgroundColor = '#059669';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (confirmDocDate && confirmDocNumber) {
                                        e.target.style.backgroundColor = '#10B981';
                                    }
                                }}
                                disabled={!confirmDocDate || !confirmDocNumber}
                            >
                                Tasdiqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rejection Modal - Soddalashtirilgan */}
            {showRejectModal && selectedItem && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Mol-mulkni rad etish</h2>
                            <button
                                onClick={() => setShowRejectModal(false)}
                                style={{ padding: '4px', cursor: 'pointer', border: 'none', background: 'none' }}
                            >
                                <X size={24} color="#6B7280" />
                            </button>
                        </div>

                        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#DC2626' }}>
                                {selectedItem.name}
                            </h3>
                            <p style={{ fontSize: '14px', color: '#6B7280' }}>
                                Tergovchi: {selectedItem.investigator} • Saqlash: {selectedItem.location}
                            </p>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Rad etish sababi *</label>
                            <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                style={styles.textarea}
                                placeholder="Mol-mulkni rad etish sababini batafsil yozing..."
                                required
                            />
                        </div>

                        <div style={styles.buttonGroup}>
                            <button
                                onClick={() => setShowRejectModal(false)}
                                style={{ ...styles.button, backgroundColor: '#F3F4F6', color: '#374151' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleSaveRejection}
                                style={{
                                    ...styles.button,
                                    ...styles.rejectButton,
                                    opacity: !rejectReason ? 0.6 : 1,
                                    cursor: !rejectReason ? 'not-allowed' : 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    if (rejectReason) {
                                        e.target.style.backgroundColor = '#DC2626';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (rejectReason) {
                                        e.target.style.backgroundColor = '#EF4444';
                                    }
                                }}
                                disabled={!rejectReason}
                            >
                                Rad etish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoragePage;