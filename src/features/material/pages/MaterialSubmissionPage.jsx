import React, { useState, useEffect } from 'react';
import { Send, Plus, Edit, FileText, CheckCircle } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import StatusBadge from '../../items/components/StatusBadge';
import Pagination from '../../../components/ui/Pagination';
import { useToast } from '../../../components/ui/Toast';

// Mock data - faqat TASDIQLANGAN statusdagi itemlar
const mockItems = [
    {
        id: 1,
        name: 'Avtomobil Toyota Camry',
        type: 'TRANSPORT',
        status: 'TASDIQLANGAN',
        createdAt: '2025-11-10',
        investigator: 'A.Karimov',
        expertise: {
            estimatedValue: '120,000,000',
        },
        materialSubmission: null,
    },
    {
        id: 2,
        name: 'Noutbuk Dell',
        type: 'ELEKTRONIKA',
        status: 'MATERIALNI_SUDGA_TOPSHIRILGAN',
        createdAt: '2025-11-12',
        investigator: 'B.Rahimov',
        expertise: {
            estimatedValue: '8,500,000',
        },
        materialSubmission: {
            date: '2025-11-14',
            organization: 'Toshkent shahar sudi',
            receivedBy: 'Sudya Rahmonov A.',
            documentNumber: 'MAT-2025-456',
            notes: 'Barcha hujjatlar to\'liq topshirildi',
        },
    },
];

const MaterialSubmissionPage = () => {
    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [submissionForm, setSubmissionForm] = useState({
        date: new Date().toISOString().split('T')[0],
        organization: '',
        receivedBy: '',
        documentNumber: '',
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

    const handleAddSubmission = (item) => {
        setSelectedItem(item);
        if (item.materialSubmission) {
            setSubmissionForm({ ...item.materialSubmission });
        } else {
            setSubmissionForm({
                date: new Date().toISOString().split('T')[0],
                organization: '',
                receivedBy: '',
                documentNumber: '',
                notes: '',
            });
        }
        setShowModal(true);
    };

    const handleSave = async () => {
        console.log('Saving material submission for item:', selectedItem.id, submissionForm);

        const updatedItems = allItems.map(item => {
            if (item.id === selectedItem.id) {
                return {
                    ...item,
                    status: 'MATERIALNI_SUDGA_TOPSHIRILGAN',
                    materialSubmission: { ...submissionForm },
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
        showSuccess('Material muvaffaqiyatli topshirildi');
    };

    const styles = {
        container: { padding: '0' },
        header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
        title: { fontSize: '30px', fontWeight: 'bold', color: '#1F2937' },
        subtitle: { color: '#6B7280', marginTop: '8px', fontSize: '14px' },
        infoBox: {
            padding: '16px',
            backgroundColor: '#FEF3C7',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid #FCD34D',
        },
        infoTitle: { fontSize: '14px', fontWeight: '600', color: '#92400E', marginBottom: '8px' },
        infoText: { fontSize: '13px', color: '#92400E', lineHeight: '1.5' },
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
                    <h1 style={styles.title}>Materiallarni sudga topshirish</h1>
                    <p style={styles.subtitle}>Mol-mulk materiallarini sud yoki boshqa organga topshiring</p>
                </div>
            </div>

            {/* Info Box */}
            <div style={styles.infoBox}>
                <p style={styles.infoTitle}>📋 Jarayon tartibi:
                </p>
                <p style={styles.infoText}>
                    Materialni sudga topshirishdan oldin quyidagilarni tekshiring:<br/>
                    • Ekspertiza natijalari to'liq kiritilgan<br/>
                    • Saqlash tasdiqlangan<br/>
                    • Barcha hujjatlar tayyorlangan
                </p>
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
                            <th style={styles.th}>Topshirilgan</th>
                            <th style={styles.th}>Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ ...styles.td, textAlign: 'center', padding: '48px', color: '#6B7280' }}>
                                    Topshirish uchun materiallar yo'q
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                    <td style={styles.td}>
                                        <div style={{ fontWeight: '500' }}>{item.name}</div>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                                            {item.type} • {item.createdAt}
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td style={styles.td}>
                                        <div style={{ fontWeight: '600', color: '#059669' }}>
                                            {item.expertise?.estimatedValue} so'm
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        {item.materialSubmission ? (
                                            <div>
                                                <div style={{ fontSize: '12px', fontWeight: '500', color: '#059669' }}>
                                                    ✓ {item.materialSubmission.documentNumber}
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#6B7280' }}>
                                                    {item.materialSubmission.date} • {item.materialSubmission.organization}
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ fontSize: '12px', color: '#EF4444' }}>Topshirilmagan</div>
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => handleAddSubmission(item)}
                                            style={{
                                                ...styles.button,
                                                backgroundColor: item.materialSubmission ? '#F59E0B' : '#6366F1',
                                                color: 'white',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = item.materialSubmission ? '#D97706' : '#4F46E5';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = item.materialSubmission ? '#F59E0B' : '#6366F1';
                                            }}
                                        >
                                            {item.materialSubmission ? <Edit size={16} /> : <Send size={16} />}
                                            {item.materialSubmission ? 'Tahrirlash' : 'Topshirish'}
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

            {/* Submission Modal */}
            {showModal && selectedItem && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Materialni topshirish</h2>
                            <button onClick={() => setShowModal(false)} style={{ padding: '4px', cursor: 'pointer', border: 'none', background: 'none' }}>
                                <span style={{ fontSize: '24px', color: '#6B7280' }}>×</span>
                            </button>
                        </div>

                        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{selectedItem.name}</h3>
                            <p style={{ fontSize: '14px', color: '#6B7280' }}>
                                Baholangan qiymat: {selectedItem.expertise?.estimatedValue} so'm
                            </p>
                        </div>

                        <div style={styles.grid2}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Topshirilgan sana *</label>
                                <input
                                    type="date"
                                    value={submissionForm.date}
                                    onChange={(e) => setSubmissionForm({ ...submissionForm, date: e.target.value })}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Hujjat raqami *</label>
                                <input
                                    type="text"
                                    value={submissionForm.documentNumber}
                                    onChange={(e) => setSubmissionForm({ ...submissionForm, documentNumber: e.target.value })}
                                    style={styles.input}
                                    placeholder="Masalan: MAT-2025-456"
                                />
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Sud/Organ nomi *</label>
                            <input
                                type="text"
                                value={submissionForm.organization}
                                onChange={(e) => setSubmissionForm({ ...submissionForm, organization: e.target.value })}
                                style={styles.input}
                                placeholder="Masalan: Toshkent shahar sudi"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Qabul qilgan shaxs *</label>
                            <input
                                type="text"
                                value={submissionForm.receivedBy}
                                onChange={(e) => setSubmissionForm({ ...submissionForm, receivedBy: e.target.value })}
                                style={styles.input}
                                placeholder="Masalan: Sudya Rahmonov A."
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Qo'shimcha izohlar</label>
                            <textarea
                                value={submissionForm.notes}
                                onChange={(e) => setSubmissionForm({ ...submissionForm, notes: e.target.value })}
                                style={styles.textarea}
                                placeholder="Topshirish bo'yicha qo'shimcha ma'lumotlar..."
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
                                style={{ ...styles.button, backgroundColor: '#6366F1', color: 'white' }}
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

export default MaterialSubmissionPage;