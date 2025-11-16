import React, { useState, useEffect } from 'react';
import { Gavel, Plus, Edit, Upload, Eye } from 'lucide-react';
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
            result: 'Yaxshi holatda',
        },
        decision: null,
    },
    {
        id: 2,
        name: 'Noutbuk Dell',
        type: 'ELEKTRONIKA',
        status: 'SUD_QARORI_KIRITILGAN',
        createdAt: '2025-11-12',
        investigator: 'B.Rahimov',
        expertise: {
            estimatedValue: '8,500,000',
            result: 'Ishlaydigan holat',
        },
        decision: {
            type: 'SUD',
            number: 'S-123/2025',
            date: '2025-11-13',
            result: 'DAVLAT_DAROMADIGA',
            organization: 'Toshkent shahar sudi',
            document: 'sud-qarori.pdf',
            notes: 'Davlat daromadiga o\'tkaziladi',
        },
    },
];

const DecisionPage = () => {
    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [decisionForm, setDecisionForm] = useState({
        type: 'SUD',
        number: '',
        date: new Date().toISOString().split('T')[0],
        result: 'DAVLAT_DAROMADIGA',
        organization: '',
        notes: '',
    });
    const [file, setFile] = useState(null);
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

    const handleAddDecision = (item) => {
        setSelectedItem(item);
        if (item.decision) {
            setDecisionForm({ ...item.decision });
        } else {
            setDecisionForm({
                type: 'SUD',
                number: '',
                date: new Date().toISOString().split('T')[0],
                result: 'DAVLAT_DAROMADIGA',
                organization: '',
                notes: '',
            });
        }
        setShowModal(true);
    };

    const handleSave = async () => {
        console.log('Saving decision for item:', selectedItem.id, decisionForm, file);

        const updatedItems = allItems.map(item => {
            if (item.id === selectedItem.id) {
                return {
                    ...item,
                    status: 'SUD_QARORI_KIRITILGAN',
                    decision: { ...decisionForm, document: file?.name },
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
        setFile(null);
        showSuccess('Sud qarori muvaffaqiyatli saqlandi');
    };

    const styles = {
        container: { padding: '0' },
        header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
        title: { fontSize: '30px', fontWeight: 'bold', color: '#1F2937' },
        subtitle: { color: '#6B7280', marginTop: '8px', fontSize: '14px' },
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
        select: { width: '100%', padding: '10px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px' },
        textarea: { width: '100%', padding: '10px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', minHeight: '80px', resize: 'vertical' },
        fileUpload: { border: '2px dashed #D1D5DB', borderRadius: '8px', padding: '24px', textAlign: 'center', cursor: 'pointer' },
        buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' },
        grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Sud yoki boshqa organ qarori</h1>
                    <p style={styles.subtitle}>Sud qarori yoki boshqa rasmiy organ qarorini kiriting</p>
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
                            <th style={styles.th}>Qaror</th>
                            <th style={styles.th}>Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ ...styles.td, textAlign: 'center', padding: '48px', color: '#6B7280' }}>
                                    Qaror kiritish uchun mol-mulk yo'q
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
                                        {item.decision ? (
                                            <div>
                                                <div style={{ fontSize: '12px', fontWeight: '500', color: '#059669' }}>
                                                    ✓ {item.decision.number}
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#6B7280' }}>
                                                    {item.decision.date} • {item.decision.organization}
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ fontSize: '12px', color: '#EF4444' }}>Kiritilmagan</div>
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => handleAddDecision(item)}
                                            style={{
                                                ...styles.button,
                                                backgroundColor: item.decision ? '#F59E0B' : '#6366F1',
                                                color: 'white',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = item.decision ? '#D97706' : '#4F46E5';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = item.decision ? '#F59E0B' : '#6366F1';
                                            }}
                                        >
                                            {item.decision ? <Edit size={16} /> : <Plus size={16} />}
                                            {item.decision ? 'Tahrirlash' : 'Kiriting'}
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

            {/* Decision Modal */}
            {showModal && selectedItem && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Qaror ma'lumotlarini kiriting</h2>
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
                                <label style={styles.label}>Qaror turi *</label>
                                <select
                                    value={decisionForm.type}
                                    onChange={(e) => setDecisionForm({ ...decisionForm, type: e.target.value })}
                                    style={styles.select}
                                >
                                    <option value="SUD">Sud qarori</option>
                                    <option value="BOSHQA_ORGAN">Boshqa organ qarori</option>
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Qaror raqami *</label>
                                <input
                                    type="text"
                                    value={decisionForm.number}
                                    onChange={(e) => setDecisionForm({ ...decisionForm, number: e.target.value })}
                                    style={styles.input}
                                    placeholder="Masalan: S-123/2025"
                                />
                            </div>
                        </div>

                        <div style={styles.grid2}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Qaror sanasi *</label>
                                <input
                                    type="date"
                                    value={decisionForm.date}
                                    onChange={(e) => setDecisionForm({ ...decisionForm, date: e.target.value })}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Qaror natijasi *</label>
                                <select
                                    value={decisionForm.result}
                                    onChange={(e) => setDecisionForm({ ...decisionForm, result: e.target.value })}
                                    style={styles.select}
                                >
                                    <option value="DAVLAT_DAROMADIGA">Davlat daromadiga</option>
                                    <option value="QAYTARILADI">Egasiga qaytariladi</option>
                                    <option value="YO'Q_QILINADI">Yo'q qilinadi</option>
                                </select>
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Tashkilot/Organ nomi *</label>
                            <input
                                type="text"
                                value={decisionForm.organization}
                                onChange={(e) => setDecisionForm({ ...decisionForm, organization: e.target.value })}
                                style={styles.input}
                                placeholder="Masalan: Toshkent shahar sudi"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Qaror hujjati *</label>
                            <div style={styles.fileUpload}>
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: 'none' }}
                                    id="decision-file"
                                    accept=".pdf,.doc,.docx"
                                />
                                <label htmlFor="decision-file" style={{ cursor: 'pointer' }}>
                                    <Upload size={32} color="#9CA3AF" style={{ margin: '0 auto 8px' }} />
                                    <p style={{ fontSize: '14px', color: '#6B7280' }}>
                                        {file ? file.name : 'Qaror hujjatini yuklang'}
                                    </p>
                                    <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                                        PDF, DOC, DOCX
                                    </p>
                                </label>
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Qo'shimcha izohlar</label>
                            <textarea
                                value={decisionForm.notes}
                                onChange={(e) => setDecisionForm({ ...decisionForm, notes: e.target.value })}
                                style={styles.textarea}
                                placeholder="Qaror bo'yicha qo'shimcha ma'lumotlar..."
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
                                Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DecisionPage;