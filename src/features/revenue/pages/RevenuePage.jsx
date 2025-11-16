import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, Edit, CheckCircle, Calendar } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import StatusBadge from '../../items/components/StatusBadge';
import Pagination from '../../../components/ui/Pagination';
import { useToast } from '../../../components/ui/Toast';

// Mock data - faqat SUD_QARORI_KIRITILGAN statusdagi itemlar
const mockItems = [
    {
        id: 1,
        name: 'Avtomobil Toyota Camry',
        type: 'TRANSPORT',
        status: 'SUD_QARORI_KIRITILGAN',
        createdAt: '2025-11-10',
        investigator: 'A.Karimov',
        expertise: {
            estimatedValue: '120,000,000',
        },
        decision: {
            number: 'S-456/2025',
            date: '2025-11-14',
            result: 'DAVLAT_DAROMADIGA',
        },
        revenue: null,
    },
    {
        id: 2,
        name: 'Noutbuk Dell',
        type: 'ELEKTRONIKA',
        status: 'TUSHGAN_MABLAG',
        createdAt: '2025-11-12',
        investigator: 'B.Rahimov',
        expertise: {
            estimatedValue: '8,500,000',
        },
        decision: {
            number: 'S-123/2025',
            date: '2025-11-13',
            result: 'DAVLAT_DAROMADIGA',
        },
        revenue: {
            amount: '8,500,000',
            date: '2025-11-15',
            account: 'Davlat byudjeti',
            reference: 'TRX-2025-001',
            notes: 'To\'liq qiymat davlat byudjetiga o\'tkazildi',
        },
    },
];

const RevenuePage = () => {
    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [revenueForm, setRevenueForm] = useState({
        amount: '',
        date: new Date().toISOString().split('T')[0],
        account: 'Davlat byudjeti',
        reference: '',
        notes: '',
    });
    const { user } = useAuth();
    const { showSuccess, showError } = useToast();

    useEffect(() => {
        loadItems();
    }, [currentPage, itemsPerPage]);

    const loadItems = async () => {
        try {
            setLoading(true);
            setTimeout(() => {
                setAllItems(mockItems);

                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const paginatedItems = mockItems.slice(startIndex, endIndex);

                setItems(paginatedItems);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Failed to load items:', error);
            showError('Ma\'lumotlarni yuklashda xatolik');
            setLoading(false);
        }
    };

    const handleAddRevenue = (item) => {
        setSelectedItem(item);
        if (item.revenue) {
            setRevenueForm({ ...item.revenue });
        } else {
            setRevenueForm({
                amount: item.expertise?.estimatedValue || '',
                date: new Date().toISOString().split('T')[0],
                account: 'Davlat byudjeti',
                reference: '',
                notes: '',
            });
        }
        setShowModal(true);
    };

    const handleSave = async () => {
        console.log('Saving revenue for item:', selectedItem.id, revenueForm);

        const updatedItems = allItems.map(item => {
            if (item.id === selectedItem.id) {
                return {
                    ...item,
                    status: 'TUSHGAN_MABLAG',
                    revenue: { ...revenueForm },
                };
            }
            return item;
        });

        setAllItems(updatedItems);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setItems(updatedItems.slice(startIndex, endIndex));

        setShowModal(false);
        setSelectedItem(null);
        showSuccess('Tushgan mablag\' muvaffaqiyatli saqlandi');
    };

    const totalRevenue = allItems
        .filter(i => i.revenue)
        .reduce((sum, i) => sum + parseFloat(i.revenue.amount.replace(/,/g, '')), 0);

    const styles = {
        container: { padding: '0' },
        header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
        title: { fontSize: '30px', fontWeight: 'bold', color: '#1F2937' },
        subtitle: { color: '#6B7280', marginTop: '8px', fontSize: '14px' },
        statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '24px' },
        statCard: { backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '24px' },
        statLabel: { fontSize: '14px', color: '#6B7280', marginBottom: '8px' },
        statValue: { fontSize: '32px', fontWeight: 'bold', color: '#059669' },
        card: { backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden' },
        table: { width: '100%', borderCollapse: 'collapse' },
        thead: { backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' },
        th: { padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase' },
        td: { padding: '16px 24px', fontSize: '14px', color: '#1F2937', borderBottom: '1px solid #F3F4F6' },
        button: { padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' },
        modal: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50 },
        modalContent: { backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' },
        modalHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
        modalTitle: { fontSize: '24px', fontWeight: 'bold', color: '#1F2937' },
        formGroup: { marginBottom: '16px' },
        label: { display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' },
        input: { width: '100%', padding: '10px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px' },
        textarea: { width: '100%', padding: '10px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', minHeight: '80px', resize: 'vertical' },
        buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' },
        grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Tushgan mablag'lar</h1>
                    <p style={styles.subtitle}>Davlat byudjetiga o'tkazilgan mablag'larni kiriting</p>
                </div>
            </div>

            {/* Stats */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <p style={styles.statLabel}>Jami tushgan mablag'</p>
                    <p style={styles.statValue}>
                        {totalRevenue.toLocaleString()} so'm
                    </p>
                </div>
                <div style={styles.statCard}>
                    <p style={styles.statLabel}>Kiritilgan</p>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F2937' }}>
                        {allItems.filter(i => i.revenue).length}
                    </p>
                </div>
                <div style={styles.statCard}>
                    <p style={styles.statLabel}>Kutilmoqda</p>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#F59E0B' }}>
                        {allItems.filter(i => !i.revenue).length}
                    </p>
                </div>
            </div>

            <div style={styles.card}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
                        <div style={{ width: '32px', height: '32px', border: '3px solid #E5E7EB', borderTopColor: '#6366F1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    </div>
                ) : (
                    <table style={styles.table}>
                        <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>Mol-mulk</th>
                            <th style={styles.th}>Holat</th>
                            <th style={styles.th}>Baholangan qiymat</th>
                            <th style={styles.th}>Tushgan mablag'</th>
                            <th style={styles.th}>Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ ...styles.td, textAlign: 'center', padding: '48px', color: '#6B7280' }}>
                                    Mablag' kiritish uchun mol-mulk yo'q
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                    <td style={styles.td}>
                                        <div style={{ fontWeight: '500' }}>{item.name}</div>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                                            Qaror: {item.decision?.number} • {item.decision?.date}
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td style={styles.td}>
                                        <div style={{ fontWeight: '600', color: '#374151' }}>
                                            {item.expertise?.estimatedValue} so'm
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        {item.revenue ? (
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#059669' }}>
                                                    {item.revenue.amount} so'm
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                                                    <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                                    {item.revenue.date}
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ fontSize: '12px', color: '#EF4444' }}>Kiritilmagan</div>
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => handleAddRevenue(item)}
                                            style={{
                                                ...styles.button,
                                                backgroundColor: item.revenue ? '#F59E0B' : '#10B981',
                                                color: 'white',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = item.revenue ? '#D97706' : '#059669';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = item.revenue ? '#F59E0B' : '#10B981';
                                            }}
                                        >
                                            {item.revenue ? <Edit size={16} /> : <Plus size={16} />}
                                            {item.revenue ? 'Tahrirlash' : 'Kiriting'}
                                        </button>
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

            {/* Revenue Modal */}
            {showModal && selectedItem && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Tushgan mablag' ma'lumotlari</h2>
                            <button onClick={() => setShowModal(false)} style={{ padding: '4px', cursor: 'pointer', border: 'none', background: 'none' }}>
                                <span style={{ fontSize: '24px', color: '#6B7280' }}>×</span>
                            </button>
                        </div>

                        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#ECFDF5', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#065F46' }}>
                                {selectedItem.name}
                            </h3>
                            <p style={{ fontSize: '13px', color: '#047857' }}>
                                Baholangan qiymat: {selectedItem.expertise?.estimatedValue} so'm<br/>
                                Qaror: {selectedItem.decision?.number} ({selectedItem.decision?.result})
                            </p>
                        </div>

                        <div style={styles.grid2}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Tushgan summa (so'm) *</label>
                                <input
                                    type="text"
                                    value={revenueForm.amount}
                                    onChange={(e) => setRevenueForm({ ...revenueForm, amount: e.target.value })}
                                    style={styles.input}
                                    placeholder="Masalan: 8,500,000"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Tushgan sana *</label>
                                <input
                                    type="date"
                                    value={revenueForm.date}
                                    onChange={(e) => setRevenueForm({ ...revenueForm, date: e.target.value })}
                                    style={styles.input}
                                />
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Hisob raqam / Byudjet *</label>
                            <input
                                type="text"
                                value={revenueForm.account}
                                onChange={(e) => setRevenueForm({ ...revenueForm, account: e.target.value })}
                                style={styles.input}
                                placeholder="Masalan: Davlat byudjeti"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>To'lov hujjati raqami</label>
                            <input
                                type="text"
                                value={revenueForm.reference}
                                onChange={(e) => setRevenueForm({ ...revenueForm, reference: e.target.value })}
                                style={styles.input}
                                placeholder="Masalan: TRX-2025-001"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Qo'shimcha izohlar</label>
                            <textarea
                                value={revenueForm.notes}
                                onChange={(e) => setRevenueForm({ ...revenueForm, notes: e.target.value })}
                                style={styles.textarea}
                                placeholder="To'lov bo'yicha qo'shimcha ma'lumotlar..."
                            />
                        </div>

                        <div style={styles.buttonGroup}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{ ...styles.button, backgroundColor: '#F3F4F6', color: '#374151' }}
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleSave}
                                style={{ ...styles.button, backgroundColor: '#10B981', color: 'white' }}
                            >
                                <CheckCircle size={16} />
                                Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RevenuePage;