import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Edit,
    FileText,
    Package,
    CheckCircle,
    XCircle,
    Clock,
    Building,
    User,
    Calendar,
    Hash,
    Ruler,
    MapPin
} from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { USER_ROLES } from '../../../utils/constants';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '../../../components/ui/Toast';

// Mock data (same as ItemsPage)
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

const ItemDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showWarning } = useToast();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const canEdit = [USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR].includes(user?.role);

    // Styles obyekti
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
        headerLeft: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
        },
        backButton: {
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
        title: {
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#1F2937',
        },
        editButton: {
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
        summaryCard: {
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            marginBottom: '24px',
        },
        summaryGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
        },
        summaryItem: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
        },
        summaryIcon: {
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        summaryContent: {
            flex: 1,
        },
        summaryLabel: {
            fontSize: '12px',
            color: '#6B7280',
            marginBottom: '4px',
        },
        summaryValue: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#1F2937',
        },
        timelineCard: {
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            marginBottom: '24px',
        },
        cardTitle: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '20px',
        },
        timeline: {
            position: 'relative',
            paddingLeft: '40px',
        },
        timelineItem: {
            position: 'relative',
            paddingBottom: '32px',
        },
        timelineIcon: {
            position: 'absolute',
            left: '-40px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            border: '2px solid',
            zIndex: 1,
        },
        timelineLine: {
            position: 'absolute',
            left: '-24px',
            top: '32px',
            bottom: '0',
            width: '2px',
            backgroundColor: '#E5E7EB',
        },
        timelineContent: {
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            padding: '16px',
        },
        timelineTitle: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: '12px',
        },
        detailGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
        },
        detailItem: {
            display: 'flex',
            flexDirection: 'column',
        },
        detailLabel: {
            fontSize: '12px',
            color: '#6B7280',
            marginBottom: '4px',
        },
        detailValue: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#1F2937',
        },
        loading: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
        },
        spinner: {
            width: '32px',
            height: '32px',
            border: '3px solid #E5E7EB',
            borderTopColor: '#6366F1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        },
        notFound: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            gap: '16px',
        },
        notFoundTitle: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1F2937',
        },
    };

    useEffect(() => {
        loadItem();
    }, [id]);

    const loadItem = async () => {
        try {
            setLoading(true);
            const foundItem = mockItems.find(i => i.id === parseInt(id));
            setItem(foundItem);
        } catch (error) {
            console.error('Failed to load item:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        if (item?.status === 'TASDIQLANGAN' || item?.status === 'TUSHGAN_MABLAG') {
            showWarning('Bu mol-mulkni tahrirlash mumkin emas. Tasdiqlovchi tasdiqlagan yoki jarayon yakunlangan.', 4000);
            return;
        }
        navigate(`/items/${id}/edit`);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
    };

    const getTimelineSteps = () => {
        const steps = [
            {
                key: 'olibQoyish',
                title: 'Olib qo\'yish',
                icon: Package,
                color: '#6366F1',
                completed: !!item?.olibQoyish,
                data: item?.olibQoyish
            },
            {
                key: 'expertise',
                title: 'Ekspertiza',
                icon: FileText,
                color: '#8B5CF6',
                completed: !!item?.expertise,
                data: item?.expertise
            },
            {
                key: 'baholash',
                title: 'Baholash',
                icon: Hash,
                color: '#EC4899',
                completed: !!item?.baholash,
                data: item?.baholash
            },
            {
                key: 'saqlash',
                title: 'Saqlashga topshirish',
                icon: Building,
                color: '#F59E0B',
                completed: !!item?.storageConfirmation,
                data: item?.saqlash
            },
            {
                key: 'sudgaTopshirish',
                title: 'Sudga topshirish',
                icon: FileText,
                color: '#10B981',
                completed: !!item?.sudgaTopshirish,
                data: item?.sudgaTopshirish
            },
            {
                key: 'sudQarori',
                title: 'Sud qarori',
                icon: CheckCircle,
                color: '#3B82F6',
                completed: !!item?.sudQarori,
                data: item?.sudQarori
            },
            {
                key: 'tushganMablag',
                title: 'Tushgan mablag\'',
                icon: CheckCircle,
                color: '#059669',
                completed: !!item?.tushganMablag,
                data: item?.tushganMablag
            }
        ];

        return steps;
    };

    if (loading) {
        return (
            <div style={styles.loading}>
                <div style={styles.spinner} />
            </div>
        );
    }

    if (!item) {
        return (
            <div style={styles.notFound}>
                <XCircle size={48} color="#EF4444" />
                <h2 style={styles.notFoundTitle}>Mol-mulk topilmadi</h2>
                <button onClick={() => navigate('/items')} style={styles.backButton}>
                    Ortga qaytish
                </button>
            </div>
        );
    }

    const timelineSteps = getTimelineSteps();


return (
    <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
            <div style={styles.headerLeft}>
                <button
                    onClick={() => navigate('/items')}
                    style={styles.backButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F9FAFB'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                    <ArrowLeft size={20} />
                    <span>Ortga</span>
                </button>
                <div>
                    <h1 style={styles.title}>{item.name}</h1>
                    <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>
                        {item.caseNumber} • {item.caseName}
                    </div>
                </div>
            </div>
            {canEdit && (
                <button
                    onClick={handleEdit}
                    style={styles.editButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#4F46E5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#6366F1'}
                >
                    <Edit size={20} />
                    <span>Tahrirlash</span>
                </button>
            )}
        </div>

        {/* Summary Card */}
        <div style={styles.summaryCard}>
            <div style={styles.summaryGrid}>
                <div style={styles.summaryItem}>
                    <div style={{ ...styles.summaryIcon, backgroundColor: '#EEF2FF' }}>
                        <Package size={20} color="#6366F1" />
                    </div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryLabel}>Holati</div>
                        <StatusBadge status={item.status} />
                    </div>
                </div>

                <div style={styles.summaryItem}>
                    <div style={{ ...styles.summaryIcon, backgroundColor: '#FEF3C7' }}>
                        <Ruler size={20} color="#F59E0B" />
                    </div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryLabel}>Miqdori</div>
                        <div style={styles.summaryValue}>{item.quantity} {item.unit}</div>
                    </div>
                </div>

                <div style={styles.summaryItem}>
                    <div style={{ ...styles.summaryIcon, backgroundColor: '#DBEAFE' }}>
                        <User size={20} color="#3B82F6" />
                    </div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryLabel}>Tergovchi</div>
                        <div style={styles.summaryValue}>{item.investigator}</div>
                    </div>
                </div>

                <div style={styles.summaryItem}>
                    <div style={{ ...styles.summaryIcon, backgroundColor: '#DCFCE7' }}>
                        <Calendar size={20} color="#10B981" />
                    </div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryLabel}>Yaratilgan sana</div>
                        <div style={styles.summaryValue}>{item.createdAt}</div>
                    </div>
                </div>

                {item.location && (
                    <div style={styles.summaryItem}>
                        <div style={{ ...styles.summaryIcon, backgroundColor: '#FEE2E2' }}>
                            <MapPin size={20} color="#EF4444" />
                        </div>
                        <div style={styles.summaryContent}>
                            <div style={styles.summaryLabel}>Joylashuv</div>
                            <div style={styles.summaryValue}>{item.location}</div>
                        </div>
                    </div>
                )}

                {item.expertise?.estimatedValue && (
                    <div style={styles.summaryItem}>
                        <div style={{ ...styles.summaryIcon, backgroundColor: '#F3E8FF' }}>
                            <Hash size={20} color="#A855F7" />
                        </div>
                        <div style={styles.summaryContent}>
                            <div style={styles.summaryLabel}>Baholangan qiymat</div>
                            <div style={styles.summaryValue}>
                                {formatCurrency(parseFloat(item.expertise.estimatedValue.replace(/,/g, '')))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Timeline */}
        <div style={styles.timelineCard}>
            <h2 style={styles.cardTitle}>Jarayon bosqichlari</h2>
            <div style={styles.timeline}>
                {timelineSteps.map((step, index) => (
                    <div key={step.key} style={styles.timelineItem}>
                        <div
                            style={{
                                ...styles.timelineIcon,
                                borderColor: step.completed ? step.color : '#E5E7EB',
                                backgroundColor: step.completed ? step.color : 'white',
                            }}
                        >
                            <step.icon size={16} color={step.completed ? 'white' : '#9CA3AF'} />
                        </div>
                        {index < timelineSteps.length - 1 && <div style={styles.timelineLine} />}

                        <div style={styles.timelineContent}>
                            <div style={styles.timelineTitle}>
                                {step.title}
                                {!step.completed && (
                                    <span style={{ color: '#9CA3AF', fontWeight: 'normal', marginLeft: '8px', fontSize: '14px' }}>
                                            (Bajarilmagan)
                                        </span>
                                )}
                            </div>

                            {step.completed && step.data && (
                                <div style={styles.detailGrid}>
                                    {/* Olib qo'yish */}
                                    {step.key === 'olibQoyish' && (
                                        <>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Dalolatnoma</div>
                                                <div style={styles.detailValue}>{step.data.dalolatnoma}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Sana</div>
                                                <div style={styles.detailValue}>{step.data.dalolatnomaSana}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Soni</div>
                                                <div style={styles.detailValue}>{step.data.soni} {step.data.oichovBirligi}</div>
                                            </div>
                                        </>
                                    )}

                                    {/* Ekspertiza */}
                                    {step.key === 'expertise' && (
                                        <>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Sana</div>
                                                <div style={styles.detailValue}>{step.data.date}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Tashkilot</div>
                                                <div style={styles.detailValue}>{step.data.organization}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Baholangan qiymat</div>
                                                <div style={styles.detailValue}>
                                                    {formatCurrency(parseFloat(step.data.estimatedValue.replace(/,/g, '')))}
                                                </div>
                                            </div>
                                            <div style={{ ...styles.detailItem, gridColumn: '1 / -1' }}>
                                                <div style={styles.detailLabel}>Natija</div>
                                                <div style={styles.detailValue}>{step.data.result}</div>
                                            </div>
                                            {step.data.notes && (
                                                <div style={{ ...styles.detailItem, gridColumn: '1 / -1' }}>
                                                    <div style={styles.detailLabel}>Izoh</div>
                                                    <div style={styles.detailValue}>{step.data.notes}</div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Baholash */}
                                    {step.key === 'baholash' && (
                                        <>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Hisobot raqami</div>
                                                <div style={styles.detailValue}>{step.data.hisobotNumber}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Sana</div>
                                                <div style={styles.detailValue}>{step.data.hisobotSana}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Bahosi</div>
                                                <div style={styles.detailValue}>{formatCurrency(step.data.bahosi)}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Summasi</div>
                                                <div style={styles.detailValue}>{formatCurrency(step.data.summasi)}</div>
                                            </div>
                                        </>
                                    )}

                                    {/* Saqlash */}
                                    {step.key === 'saqlash' && (
                                        <>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Hujjat raqami</div>
                                                <div style={styles.detailValue}>{step.data.hujjatNumber}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Sana</div>
                                                <div style={styles.detailValue}>{step.data.hujjatSana}</div>
                                            </div>
                                            <div style={{ ...styles.detailItem, gridColumn: '1 / -1' }}>
                                                <div style={styles.detailLabel}>Tashkilot</div>
                                                <div style={styles.detailValue}>{step.data.tashkilotNomi}</div>
                                            </div>
                                        </>
                                    )}

                                    {/* Sudga topshirish */}
                                    {step.key === 'sudgaTopshirish' && (
                                        <>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Hujjat raqami</div>
                                                <div style={styles.detailValue}>{step.data.number}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Sana</div>
                                                <div style={styles.detailValue}>{step.data.sana}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Soni</div>
                                                <div style={styles.detailValue}>{step.data.soni}</div>
                                            </div>
                                        </>
                                    )}

                                    {/* Sud qarori */}
                                    {step.key === 'sudQarori' && (
                                        <>
                                            {step.data.egasigaQaytarildi.soni > 0 && (
                                                <>
                                                    <div style={{ ...styles.detailItem, gridColumn: '1 / -1' }}>
                                                        <div style={styles.detailLabel}>Egasiga qaytarildi</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Hujjat</div>
                                                        <div style={styles.detailValue}>{step.data.egasigaQaytarildi.number}</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Sana</div>
                                                        <div style={styles.detailValue}>{step.data.egasigaQaytarildi.sana}</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Soni</div>
                                                        <div style={styles.detailValue}>{step.data.egasigaQaytarildi.soni}</div>
                                                    </div>
                                                </>
                                            )}

                                            {step.data.davlatDaromadiga.soni > 0 && (
                                                <>
                                                    <div style={{ ...styles.detailItem, gridColumn: '1 / -1' }}>
                                                        <div style={styles.detailLabel}>Davlat daromadiga</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Hujjat</div>
                                                        <div style={styles.detailValue}>{step.data.davlatDaromadiga.number}</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Sana</div>
                                                        <div style={styles.detailValue}>{step.data.davlatDaromadiga.sana}</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Soni</div>
                                                        <div style={styles.detailValue}>{step.data.davlatDaromadiga.soni}</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Summasi</div>
                                                        <div style={styles.detailValue}>{formatCurrency(step.data.davlatDaromadiga.summasi)}</div>
                                                    </div>
                                                </>
                                            )}

                                            {step.data.yoqQilindi.soni > 0 && (
                                                <>
                                                    <div style={{ ...styles.detailItem, gridColumn: '1 / -1' }}>
                                                        <div style={styles.detailLabel}>Yo'q qilindi</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Hujjat</div>
                                                        <div style={styles.detailValue}>{step.data.yoqQilindi.number}</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Sana</div>
                                                        <div style={styles.detailValue}>{step.data.yoqQilindi.sana}</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Soni</div>
                                                        <div style={styles.detailValue}>{step.data.yoqQilindi.soni}</div>
                                                    </div>
                                                </>
                                            )}

                                            {step.data.ijrochigaTopshirildi.soni > 0 && (
                                                <>
                                                    <div style={{ ...styles.detailItem, gridColumn: '1 / -1' }}>
                                                        <div style={styles.detailLabel}>Ijrochiga topshirildi</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Hujjat</div>
                                                        <div style={styles.detailValue}>{step.data.ijrochigaTopshirildi.number}</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Sana</div>
                                                        <div style={styles.detailValue}>{step.data.ijrochigaTopshirildi.sana}</div>
                                                    </div>
                                                    <div style={styles.detailItem}>
                                                        <div style={styles.detailLabel}>Soni</div>
                                                        <div style={styles.detailValue}>{step.data.ijrochigaTopshirildi.soni}</div>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {/* Tushgan mablag */}
                                    {step.key === 'tushganMablag' && (
                                        <>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Jami tushgan mablag'</div>
                                                <div style={styles.detailValue}>{formatCurrency(step.data.hammasi)}</div>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <div style={styles.detailLabel}>Mahalliy byudjet</div>
                                                <div style={styles.detailValue}>{formatCurrency(step.data.mahalliyBudjet)}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
    </div>
);
};

export default ItemDetailPage;