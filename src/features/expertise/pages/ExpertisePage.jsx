import React, { useState, useEffect } from 'react';
import { FileText, Plus, Eye, Edit, Save } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import StatusBadge from '../../items/components/StatusBadge';

// Mock data - faqat YARATILGAN va EKSPERTIZA_KIRITILGAN statusdagi itemlar
const mockItems = [
    {
        id: 1,
        name: 'Avtomobil Toyota Camry',
        type: 'TRANSPORT',
        status: 'YARATILGAN',
        createdAt: '2025-11-10',
        investigator: 'A.Karimov',
        expertise: null,
    },
    {
        id: 2,
        name: 'Oltin ziynet buyumlari',
        type: 'QIMMATBAHO',
        status: 'YARATILGAN',
        createdAt: '2025-11-13',
        investigator: 'A.Karimov',
        expertise: null,
    },
    {
        id: 3,
        name: 'Noutbuk Dell',
        type: 'ELEKTRONIKA',
        status: 'EKSPERTIZA_KIRITILGAN',
        createdAt: '2025-11-12',
        investigator: 'B.Rahimov',
        expertise: {
            date: '2025-11-14',
            organization: 'Markaziy ekspertiza bo\'limi',
            result: 'Yuqori sifatli, ishlaydigan holat',
            estimatedValue: '8,500,000',
            documents: ['ekspertiza-akt.pdf'],
        },
    },
];

const ExpertisePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [expertiseForm, setExpertiseForm] = useState({
        date: new Date().toISOString().split('T')[0],
        organization: '',
        result: '',
        estimatedValue: '',
        notes: '',
    });
    const { user } = useAuth();

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            setLoading(true);
            setTimeout(() => {
                setItems(mockItems);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Failed to load items:', error);
            setLoading(false);
        }
    };

    const handleAddExpertise = (item) => {
        setSelectedItem(item);
        if (item.expertise) {
            setExpertiseForm({
                date: item.expertise.date,
                organization: item.expertise.organization,
                result: item.expertise.result,
                estimatedValue: item.expertise.estimatedValue,
                notes: item.expertise.notes || '',
            });
        } else {
            setExpertiseForm({
                date: new Date().toISOString().split('T')[0],
                organization: '',
                result: '',
                estimatedValue: '',
                notes: '',
            });
        }
        setShowModal(true);
    };

    const handleSave = async () => {
        console.log('Saving expertise for item:', selectedItem.id, expertiseForm);

        // Update item status
        const updatedItems = items.map(item => {
            if (item.id === selectedItem.id) {
                return {
                    ...item,
                    status: 'EKSPERTIZA_KIRITILGAN',
                    expertise: { ...expertiseForm },
                };
            }
            return item;
        });

        setItems(updatedItems);
        setShowModal(false);
        setSelectedItem(null);
    };

    const handleSendToStorage = async (item) => {
        if (!item.expertise) {
            alert('Avval ekspertiza natijasini kiriting!');
            return;
        }

        console.log('Sending to storage:', item.id);

        // Update status to SAQLASHGA_YUBORILGAN
        const updatedItems = items.map(i => {
            if (i.id === item.id) {
                return { ...i, status: 'SAQLASHGA_YUBORILGAN' };
            }
            return i;
        });

        setItems(updatedItems);
        alert('Mol-mulk saqlash joyiga yuborildi!');
    };

    const styles = {
        container: { padding: '0' },
        header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
        title: { fontSize: '30px', fontWeight: 'bold', color: '#1F2937' },
        subtitle: { color: '#6B7280', marginTop: '8px', fontSize: '14px' },
        card: { backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden', marginBottom: '24px' },
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
        textarea: { width: '100%', padding: '10px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', minHeight: '100px', resize: 'vertical' },
        buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' },
        infoBox: { padding: '16px', backgroundColor: '#EEF2FF', borderRadius: '8px', marginBottom: '16px', border: '1px solid #C7D2FE' },
        infoTitle: { fontSize: '14px', fontWeight: '600', color: '#4338CA', marginBottom: '8px' },
        infoText: { fontSize: '13px', color: '#4338CA', lineHeight: '1.5' },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Ekspertiza natijalari</h1>
                    <p style={styles.subtitle}>Mol-mulk ekspertiza natijalarini kiriting va saqlash joyiga yuboring</p>
                </div>
            </div>

            {/* Info Box */}
            <div style={styles.infoBox}>
                <p style={styles.infoTitle}>📋 Jarayon tartibi:</p>
                <p style={styles.infoText}>
                    1. Ekspertiza natijasini kiriting (baholangan qiymat va xulosalar)<br/>
                    2. Saqlandi tugmasini bosing<br/>
                    3. "Saqlashga yuborish" tugmasini bosing<br/>
                    4. Tasdiqlovchi saqlash joyiga kelganini tasdiqlaydi
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
                            <th style={styles.th}>Turi</th>
                            <th style={styles.th}>Holat</th>
                            <th style={styles.th}>Ekspertiza</th>
                            <th style={styles.th}>Baholangan qiymat</th>
                            <th style={styles.th}>Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ ...styles.td, textAlign: 'center', padding: '48px', color: '#6B7280' }}>
                                    Ekspertiza uchun mol-mulk yo'q
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                    <td style={styles.td}>
                                        <div style={{ fontWeight: '500' }}>{item.name}</div>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                                            {item.createdAt}
                                        </div>
                                    </td>
                                    <td style={styles.td}>{item.type}</td>
                                    <td style={styles.td}>
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td style={styles.td}>
                                        {item.expertise ? (
                                            <div>
                                                <div style={{ fontSize: '12px', color: '#059669', fontWeight: '500' }}>✓ Kiritilgan</div>
                                                <div style={{ fontSize: '11px', color: '#6B7280' }}>{item.expertise.date}</div>
                                            </div>
                                        ) : (
                                            <div style={{ fontSize: '12px', color: '#EF4444' }}>Kiritilmagan</div>
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        {item.expertise ? (
                                            <div style={{ fontWeight: '600', color: '#059669' }}>
                                                {item.expertise.estimatedValue} so'm
                                            </div>
                                        ) : (
                                            <div style={{ color: '#9CA3AF' }}>-</div>
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <button
                                                onClick={() => handleAddExpertise(item)}
                                                style={{
                                                    ...styles.button,
                                                    backgroundColor: item.expertise ? '#F59E0B' : '#6366F1',
                                                    color: 'white',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = item.expertise ? '#D97706' : '#4F46E5';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = item.expertise ? '#F59E0B' : '#6366F1';
                                                }}
                                            >
                                                {item.expertise ? <Edit size={16} /> : <Plus size={16} />}
                                                {item.expertise ? 'Tahrirlash' : 'Kiriting'}
                                            </button>

                                            {item.status === 'EKSPERTIZA_KIRITILGAN' && (
                                                <button
                                                    onClick={() => handleSendToStorage(item)}
                                                    style={{ ...styles.button, backgroundColor: '#10B981', color: 'white' }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
                                                >
                                                    <Save size={16} />
                                                    Saqlashga yuborish
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

            {/* Expertise Modal */}
            {showModal && selectedItem && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Ekspertiza natijasini kiriting</h2>
                            <button onClick={() => setShowModal(false)} style={{ padding: '4px', cursor: 'pointer', border: 'none', background: 'none' }}>
                                <span style={{ fontSize: '24px', color: '#6B7280' }}>×</span>
                            </button>
                        </div>

                        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{selectedItem.name}</h3>
                            <p style={{ fontSize: '14px', color: '#6B7280' }}>Turi: {selectedItem.type}</p>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Ekspertiza sanasi *</label>
                            <input
                                type="date"
                                value={expertiseForm.date}
                                onChange={(e) => setExpertiseForm({ ...expertiseForm, date: e.target.value })}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Ekspertiza tashkiloti *</label>
                            <input
                                type="text"
                                value={expertiseForm.organization}
                                onChange={(e) => setExpertiseForm({ ...expertiseForm, organization: e.target.value })}
                                style={styles.input}
                                placeholder="Masalan: Markaziy ekspertiza bo'limi"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Baholangan qiymat (so'm) *</label>
                            <input
                                type="text"
                                value={expertiseForm.estimatedValue}
                                onChange={(e) => setExpertiseForm({ ...expertiseForm, estimatedValue: e.target.value })}
                                style={styles.input}
                                placeholder="Masalan: 8,500,000"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Ekspertiza xulosasi *</label>
                            <textarea
                                value={expertiseForm.result}
                                onChange={(e) => setExpertiseForm({ ...expertiseForm, result: e.target.value })}
                                style={styles.textarea}
                                placeholder="Mol-mulk holati, xususiyatlari va boshqa muhim ma'lumotlar..."
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Qo'shimcha izohlar</label>
                            <textarea
                                value={expertiseForm.notes}
                                onChange={(e) => setExpertiseForm({ ...expertiseForm, notes: e.target.value })}
                                style={styles.textarea}
                                placeholder="Ixtiyoriy qo'shimcha ma'lumotlar..."
                            />
                        </div>

                        <div style={styles.buttonGroup}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{ ...styles.button, backgroundColor: '#F3F4F6', color: '#374151' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleSave}
                                style={{ ...styles.button, backgroundColor: '#6366F1', color: 'white' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#4F46E5'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#6366F1'}
                            >
                                <Save size={16} />
                                Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpertisePage;