import React from 'react';
import { X, Download, FileText, Package, Calendar, User, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ItemViewModal = ({ item, onClose }) => {
    const handleExportPDF = () => {
        // PDF export funksiyasi
        const printContent = document.getElementById('item-print-content');
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };

    const styles = {
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
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflowY: 'auto',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
            borderBottom: '1px solid #E5E7EB',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 10,
        },
        headerTitle: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1F2937',
        },
        headerButtons: {
            display: 'flex',
            gap: '12px',
        },
        button: {
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
        },
        content: {
            padding: '24px',
        },
        section: {
            marginBottom: '24px',
            padding: '20px',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
        },
        sectionTitle: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
        },
        field: {
            marginBottom: '12px',
        },
        label: {
            fontSize: '13px',
            color: '#6B7280',
            marginBottom: '4px',
            fontWeight: '500',
        },
        value: {
            fontSize: '15px',
            color: '#1F2937',
            fontWeight: '500',
        },
        timeline: {
            position: 'relative',
            paddingLeft: '32px',
        },
        timelineItem: {
            position: 'relative',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderLeft: '2px solid #E5E7EB',
            paddingLeft: '20px',
        },
        timelineItemLast: {
            borderLeft: 'none',
        },
        timelineDot: {
            position: 'absolute',
            left: '-9px',
            top: '4px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#6366F1',
            border: '3px solid white',
            boxShadow: '0 0 0 2px #6366F1',
        },
        timelineDate: {
            fontSize: '12px',
            color: '#6B7280',
            marginBottom: '4px',
        },
        timelineTitle: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: '4px',
        },
        timelineDesc: {
            fontSize: '13px',
            color: '#6B7280',
        },
    };

    return (
        <div style={styles.modal}>
            <div style={styles.modalContent}>
                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>Mol-mulk  harakati ma'lumotlari</h2>
                    <div style={styles.headerButtons}>
                        <button
                            onClick={handleExportPDF}
                            style={{ ...styles.button, backgroundColor: '#EF4444', color: 'white' }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#DC2626')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#EF4444')}
                        >
                            <Download size={16} />
                            PDF
                        </button>
                        <button
                            onClick={onClose}
                            style={{ ...styles.button, backgroundColor: '#F3F4F6', color: '#374151' }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#E5E7EB')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#F3F4F6')}
                        >
                            <X size={16} />
                            Yopish
                        </button>
                    </div>
                </div>

                {/* Content for printing */}
                <div id="item-print-content" style={styles.content}>
                    {/* Basic Info */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>
                            <Package size={20} />
                            Asosiy ma'lumotlar
                        </h3>
                        <div style={styles.grid}>
                            <div style={styles.field}>
                                <div style={styles.label}>Nomi</div>
                                <div style={styles.value}>{item.name}</div>
                            </div>
                            <div style={styles.field}>
                                <div style={styles.label}>Turi</div>
                                <div style={styles.value}>{item.type}</div>
                            </div>
                            <div style={styles.field}>
                                <div style={styles.label}>Holati</div>
                                <div><StatusBadge status={item.status} /></div>
                            </div>
                            <div style={styles.field}>
                                <div style={styles.label}>Yaratilgan sana</div>
                                <div style={styles.value}>{item.createdAt}</div>
                            </div>
                            <div style={styles.field}>
                                <div style={styles.label}>Tergovchi</div>
                                <div style={styles.value}>{item.investigator}</div>
                            </div>
                            {item.location && (
                                <div style={styles.field}>
                                    <div style={styles.label}>Saqlash joyi</div>
                                    <div style={styles.value}>{item.location}</div>
                                </div>
                            )}
                        </div>
                        {item.description && (
                            <div style={{ ...styles.field, marginTop: '16px' }}>
                                <div style={styles.label}>Tavsif</div>
                                <div style={styles.value}>{item.description}</div>
                            </div>
                        )}
                    </div>

                    {/* Expertise */}
                    {item.expertise && (
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <FileText size={20} />
                                Ekspertiza natijalari
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.field}>
                                    <div style={styles.label}>Sana</div>
                                    <div style={styles.value}>{item.expertise.date}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Tashkilot</div>
                                    <div style={styles.value}>{item.expertise.organization}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Baholangan qiymat</div>
                                    <div style={{ ...styles.value, color: '#059669', fontSize: '18px' }}>
                                        {item.expertise.estimatedValue} so'm
                                    </div>
                                </div>
                            </div>
                            <div style={{ ...styles.field, marginTop: '16px' }}>
                                <div style={styles.label}>Xulosalar</div>
                                <div style={styles.value}>{item.expertise.result}</div>
                            </div>
                            {item.expertise.notes && (
                                <div style={{ ...styles.field, marginTop: '12px' }}>
                                    <div style={styles.label}>Qo'shimcha izohlar</div>
                                    <div style={styles.value}>{item.expertise.notes}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Storage Confirmation */}
                    {item.storageConfirmation && (
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <MapPin size={20} />
                                Saqlash tasdiqlangan
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.field}>
                                    <div style={styles.label}>Tasdiqlagan</div>
                                    <div style={styles.value}>{item.storageConfirmation.confirmedBy}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Tasdiqlash sanasi</div>
                                    <div style={styles.value}>{item.storageConfirmation.date}</div>
                                </div>
                            </div>
                            {item.storageConfirmation.note && (
                                <div style={{ ...styles.field, marginTop: '16px' }}>
                                    <div style={styles.label}>Eslatma</div>
                                    <div style={styles.value}>{item.storageConfirmation.note}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Material Submission to Court */}
                    {item.materialSubmission && (
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <FileText size={20} />
                                Materialni sudga topshirish
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.field}>
                                    <div style={styles.label}>Topshirilgan sana</div>
                                    <div style={styles.value}>{item.materialSubmission.date}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Sud/Organ</div>
                                    <div style={styles.value}>{item.materialSubmission.organization}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Qabul qilgan shaxs</div>
                                    <div style={styles.value}>{item.materialSubmission.receivedBy}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Hujjat raqami</div>
                                    <div style={styles.value}>{item.materialSubmission.documentNumber}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Court Decision */}
                    {item.decision && (
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <FileText size={20} />
                                Sud qarori
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.field}>
                                    <div style={styles.label}>Qaror turi</div>
                                    <div style={styles.value}>{item.decision.type}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Qaror raqami</div>
                                    <div style={styles.value}>{item.decision.number}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Sana</div>
                                    <div style={styles.value}>{item.decision.date}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Natija</div>
                                    <div style={styles.value}>{item.decision.result}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Tashkilot</div>
                                    <div style={styles.value}>{item.decision.organization}</div>
                                </div>
                            </div>
                            {item.decision.notes && (
                                <div style={{ ...styles.field, marginTop: '16px' }}>
                                    <div style={styles.label}>Izohlar</div>
                                    <div style={styles.value}>{item.decision.notes}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Revenue */}
                    {item.revenue && (
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <Download size={20} />
                                Tushgan mablag'
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.field}>
                                    <div style={styles.label}>Summa</div>
                                    <div style={{ ...styles.value, color: '#059669', fontSize: '18px' }}>
                                        {item.revenue.amount} so'm
                                    </div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Tushgan sana</div>
                                    <div style={styles.value}>{item.revenue.date}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>Hisob raqam</div>
                                    <div style={styles.value}>{item.revenue.account}</div>
                                </div>
                                <div style={styles.field}>
                                    <div style={styles.label}>To'lov raqami</div>
                                    <div style={styles.value}>{item.revenue.reference}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Timeline */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>
                            <Calendar size={20} />
                            Jarayon tarixi
                        </h3>
                        <div style={styles.timeline}>
                            <div style={styles.timelineItem}>
                                <div style={styles.timelineDot}></div>
                                <div style={styles.timelineDate}>{item.createdAt}</div>
                                <div style={styles.timelineTitle}>Mol-mulk yaratildi</div>
                                <div style={styles.timelineDesc}>Tergovchi: {item.investigator}</div>
                            </div>

                            {item.expertise && (
                                <div style={styles.timelineItem}>
                                    <div style={{ ...styles.timelineDot, backgroundColor: '#8B5CF6' }}></div>
                                    <div style={styles.timelineDate}>{item.expertise.date}</div>
                                    <div style={styles.timelineTitle}>Ekspertiza natijalari kiritildi</div>
                                    <div style={styles.timelineDesc}>
                                        Baholangan qiymat: {item.expertise.estimatedValue} so'm
                                    </div>
                                </div>
                            )}

                            {item.storageConfirmation && (
                                <div style={styles.timelineItem}>
                                    <div style={{ ...styles.timelineDot, backgroundColor: '#10B981' }}></div>
                                    <div style={styles.timelineDate}>{item.storageConfirmation.date}</div>
                                    <div style={styles.timelineTitle}>Saqlash tasdiqlandi</div>
                                    <div style={styles.timelineDesc}>
                                        Tasdiqlagan: {item.storageConfirmation.confirmedBy}
                                    </div>
                                </div>
                            )}

                            {item.materialSubmission && (
                                <div style={styles.timelineItem}>
                                    <div style={{ ...styles.timelineDot, backgroundColor: '#F59E0B' }}></div>
                                    <div style={styles.timelineDate}>{item.materialSubmission.date}</div>
                                    <div style={styles.timelineTitle}>Materiallar sudga topshirildi</div>
                                    <div style={styles.timelineDesc}>
                                        {item.materialSubmission.organization}
                                    </div>
                                </div>
                            )}

                            {item.decision && (
                                <div style={styles.timelineItem}>
                                    <div style={{ ...styles.timelineDot, backgroundColor: '#EF4444' }}></div>
                                    <div style={styles.timelineDate}>{item.decision.date}</div>
                                    <div style={styles.timelineTitle}>Sud qarori kiritildi</div>
                                    <div style={styles.timelineDesc}>
                                        {item.decision.number} - {item.decision.result}
                                    </div>
                                </div>
                            )}

                            {item.revenue && (
                                <div style={{ ...styles.timelineItem, ...styles.timelineItemLast }}>
                                    <div style={{ ...styles.timelineDot, backgroundColor: '#059669' }}></div>
                                    <div style={styles.timelineDate}>{item.revenue.date}</div>
                                    <div style={styles.timelineTitle}>Mablag' tushdi</div>
                                    <div style={styles.timelineDesc}>{item.revenue.amount} so'm</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #item-print-content, #item-print-content * {
            visibility: visible;
          }
          #item-print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default ItemViewModal;