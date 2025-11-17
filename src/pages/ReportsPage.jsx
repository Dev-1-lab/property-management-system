import React, { useState } from 'react';
import { BarChart, Download, FileText, Calendar, TrendingUp, Package, Users, Clock, DollarSign } from 'lucide-react';

const ReportsPage = () => {
    const [dateRange, setDateRange] = useState({
        from: '2025-11-01',
        to: '2025-11-15',
    });
    const [selectedReport, setSelectedReport] = useState('overview');

    // Mock statistics data - barcha valyutalarni hisobga olgan holda
    const stats = {
        totalItems: 156,
        confirmed: 121,
        inExpertise: 12,
        completed: 23,

        // Jami mablag'lar barcha valyutalarda
        totalRevenue: {
            'SOʻM': '245,750,000',
            'USD': '15,800',
            'EUR': '12,500',
            'RUB': '850,000'
        },
        localBudgetRevenue: {
            'SOʻM': '198,500,000',
            'USD': '12,300',
            'EUR': '9,800',
            'RUB': '680,000'
        },

        byType: {
            TRANSPORT: 45,
            ELEKTRONIKA: 67,
            QIMMATBAHO: 32,
            BOSHQA: 12,
        },
        byStatus: {
            YARATILGAN: 8,
            SAQLASHGA_YUBORILGAN: 15,
            TASDIQLANGAN: 45,
            EKSPERTIZAGA_YUBORILGAN: 12,
            BAHOLANGAN: 34,
            SUD_QARORI: 42,
        },
        byInvestigator: [
            {
                name: 'A.Karimov',
                count: 67,
                completed: 54,
                revenue: {
                    'SOʻM': '98,500,000',
                    'USD': '6,200',
                    'EUR': '4,800'
                }
            },
            {
                name: 'B.Rahimov',
                count: 45,
                completed: 38,
                revenue: {
                    'SOʻM': '67,300,000',
                    'USD': '4,100',
                    'EUR': '3,200',
                    'RUB': '250,000'
                }
            },
            {
                name: 'S.Toshmatov',
                count: 34,
                completed: 29,
                revenue: {
                    'SOʻM': '45,950,000',
                    'USD': '2,800',
                    'RUB': '180,000'
                }
            },
            {
                name: 'N.Umarova',
                count: 10,
                completed: 0,
                revenue: {
                    'SOʻM': '0',
                    'USD': '0'
                }
            },
        ],
        revenueByCurrency: {
            'SOʻM': '245,750,000',
            'USD': '15,800',
            'EUR': '12,500',
            'RUB': '850,000'
        },
        monthlyTrend: [
            {
                month: 'Sentabr',
                count: 42,
                revenue: {
                    'SOʻM': '78,500,000',
                    'USD': '4,800'
                }
            },
            {
                month: 'Oktabr',
                count: 58,
                revenue: {
                    'SOʻM': '95,300,000',
                    'USD': '5,900',
                    'EUR': '3,200'
                }
            },
            {
                month: 'Noyabr',
                count: 56,
                revenue: {
                    'SOʻM': '71,950,000',
                    'USD': '4,500',
                    'EUR': '2,800',
                    'RUB': '150,000'
                }
            },
        ],
        revenueByType: {
            TRANSPORT: {
                'SOʻM': '156,200,000',
                'USD': '9,500',
                'EUR': '7,200'
            },
            ELEKTRONIKA: {
                'SOʻM': '45,800,000',
                'USD': '2,800'
            },
            QIMMATBAHO: {
                'SOʻM': '38,450,000',
                'USD': '2,300',
                'EUR': '1,800'
            },
            BOSHQA: {
                'SOʻM': '5,300,000',
                'USD': '320'
            }
        }
    };

    const reportTypes = [
        { id: 'overview', name: 'Umumiy hisobot', icon: BarChart },
        { id: 'byType', name: 'Tur bo\'yicha', icon: Package },
        { id: 'byInvestigator', name: 'Tergovchi bo\'yicha', icon: Users },
        { id: 'revenue', name: 'Mablag\'lar', icon: DollarSign },
        { id: 'timeline', name: 'Vaqt bo\'yicha', icon: Clock },
    ];

    const handleExport = (format) => {
        console.log(`Exporting ${selectedReport} as ${format}`);
        alert(`Hisobot ${format.toUpperCase()} formatida yuklanmoqda...`);
    };

    // Format raqamni o'qiladigan shaklda ko'rsatish
    const formatCurrency = (amount, currency = 'SOʻM') => {
        return `${amount} ${currency}`;
    };

    // Mablag'ni barcha valyutalarda ko'rsatish
    const renderMultipleCurrencies = (revenueObj) => {
        return Object.entries(revenueObj)
            .filter(([currency, amount]) => amount !== '0' && amount !== '0')
            .map(([currency, amount]) => (
                <div key={currency} style={{
                    display: 'inline-block',
                    margin: '2px 4px 2px 0',
                    padding: '2px 6px',
                    backgroundColor: currency === 'SOʻM' ? '#DCFCE7' :
                        currency === 'USD' ? '#DBEAFE' :
                            currency === 'EUR' ? '#FEF3C7' : '#FEE2E2',
                    color: currency === 'SOʻM' ? '#166534' :
                        currency === 'USD' ? '#1E40AF' :
                            currency === 'EUR' ? '#92400E' : '#991B1B',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '500'
                }}>
                    {formatCurrency(amount, currency)}
                </div>
            ));
    };

    // Jami mablag'ni barcha valyutalarda ko'rsatish
    const renderTotalRevenue = (revenueObj) => {
        return Object.entries(revenueObj)
            .filter(([currency, amount]) => amount !== '0' && amount !== '0')
            .map(([currency, amount]) => (
                <div key={currency} style={{ marginBottom: '4px' }}>
                    <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#059669',
                        display: 'block'
                    }}>
                        {formatCurrency(amount, currency)}
                    </span>
                </div>
            ));
    };

    // Valyuta ranglari
    const getCurrencyColor = (currency) => {
        return currency === 'SOʻM' ? '#10B981' :
            currency === 'USD' ? '#6366F1' :
                currency === 'EUR' ? '#F59E0B' : '#EF4444';
    };

    const styles = {
        container: { padding: '0' },
        header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
        title: { fontSize: '30px', fontWeight: 'bold', color: '#1F2937' },
        card: { backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '24px' },
        filterSection: { display: 'flex', gap: '16px', alignItems: 'flex-end', marginBottom: '24px' },
        formGroup: { flex: 1 },
        label: { display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' },
        input: { width: '100%', padding: '10px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px' },
        button: { padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' },
        reportTypeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' },
        reportTypeCard: { padding: '16px', border: '2px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' },
        reportTypeCardActive: { borderColor: '#6366F1', backgroundColor: '#EEF2FF' },
        statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' },
        statCard: { padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' },
        statValue: { fontSize: '32px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' },
        statLabel: { fontSize: '14px', color: '#6B7280' },
        table: { width: '100%', borderCollapse: 'collapse' },
        th: { padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', borderBottom: '2px solid #E5E7EB' },
        td: { padding: '16px 12px', fontSize: '14px', color: '#1F2937', borderBottom: '1px solid #F3F4F6' },
        progressBar: { width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' },
        progressFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: '4px', transition: 'width 0.3s' },
        chartBar: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
        barLabel: { width: '120px', fontSize: '14px', color: '#374151', marginRight: '75px' },
        barContainer: { flex: 1, height: '32px', backgroundColor: '#F3F4F6', borderRadius: '4px', position: 'relative', overflow: 'hidden' },
        barFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px' },
        barValue: { color: 'white', fontSize: '12px', fontWeight: '600' },
        revenueGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' },
        currencyBadge: {
            display: 'inline-block',
            padding: '4px 8px',
            backgroundColor: '#EEF2FF',
            color: '#6366F1',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            marginLeft: '8px'
        },
        revenueCard: {
            padding: '20px',
            backgroundColor: '#F0FDF4',
            borderRadius: '12px',
            border: '1px solid #BBF7D0',
            textAlign: 'center'
        },
        revenueValue: { fontSize: '24px', fontWeight: 'bold', color: '#059669', marginBottom: '8px' },
        revenueLabel: { fontSize: '14px', color: '#047857', fontWeight: '500' },
        multiCurrencyContainer: { display: 'flex', flexDirection: 'column', gap: '4px' },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Hisobotlar va statistika</h1>
                    <p style={{ color: '#6B7280', marginTop: '8px' }}>Tizim faoliyati bo'yicha batafsil ma'lumotlar</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => handleExport('excel')}
                        style={{ ...styles.button, backgroundColor: '#10B981', color: 'white' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
                    >
                        <Download size={20} />
                        Excel
                    </button>
                    <button
                        onClick={() => handleExport('pdf')}
                        style={{ ...styles.button, backgroundColor: '#EF4444', color: 'white' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#DC2626'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#EF4444'}
                    >
                        <FileText size={20} />
                        PDF
                    </button>
                </div>
            </div>

            {/* Date Range Filter */}
            <div style={styles.card}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1F2937' }}>
                    <Calendar size={20} style={{ display: 'inline', marginRight: '8px' }} />
                    Muddat tanlash
                </h3>
                <div style={styles.filterSection}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Boshlanish sanasi</label>
                        <input
                            type="date"
                            value={dateRange.from}
                            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Tugash sanasi</label>
                        <input
                            type="date"
                            value={dateRange.to}
                            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                            style={styles.input}
                        />
                    </div>
                    <button
                        style={{ ...styles.button, backgroundColor: '#6366F1', color: 'white' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#4F46E5'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#6366F1'}
                    >
                        Qo'llash
                    </button>
                </div>
            </div>

            {/* Report Type Selection */}
            <div style={styles.reportTypeGrid}>
                {reportTypes.map((type) => (
                    <div
                        key={type.id}
                        onClick={() => setSelectedReport(type.id)}
                        style={{
                            ...styles.reportTypeCard,
                            ...(selectedReport === type.id ? styles.reportTypeCardActive : {}),
                        }}
                        onMouseEnter={(e) => {
                            if (selectedReport !== type.id) {
                                e.currentTarget.style.borderColor = '#6366F1';
                                e.currentTarget.style.backgroundColor = '#F9FAFB';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (selectedReport !== type.id) {
                                e.currentTarget.style.borderColor = '#E5E7EB';
                                e.currentTarget.style.backgroundColor = 'white';
                            }
                        }}
                    >
                        <type.icon size={32} color={selectedReport === type.id ? '#6366F1' : '#6B7280'} style={{ margin: '0 auto 12px' }} />
                        <p style={{ fontSize: '14px', fontWeight: '500', color: selectedReport === type.id ? '#6366F1' : '#374151' }}>
                            {type.name}
                        </p>
                    </div>
                ))}
            </div>

            {/* Overview Stats */}
            {selectedReport === 'overview' && (
                <>
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <p style={styles.statValue}>{stats.totalItems}</p>
                            <p style={styles.statLabel}>Jami mol-mulk</p>
                        </div>
                        <div style={styles.statCard}>
                            <p style={styles.statValue}>{stats.confirmed}</p>
                            <p style={styles.statLabel}>Tasdiqlangan</p>
                        </div>
                        <div style={styles.statCard}>
                            <p style={styles.statValue}>{stats.inExpertise}</p>
                            <p style={styles.statLabel}>Ekspertizada</p>
                        </div>
                        <div style={styles.statCard}>
                            <p style={styles.statValue}>{stats.completed}</p>
                            <p style={styles.statLabel}>Yakunlangan</p>
                        </div>
                    </div>

                    {/* Revenue Overview */}
                    <div style={styles.revenueGrid}>
                        <div style={styles.revenueCard}>
                            <div style={styles.multiCurrencyContainer}>
                                {renderTotalRevenue(stats.totalRevenue)}
                            </div>
                            <p style={styles.revenueLabel}>Jami tushgan mablag'</p>
                        </div>
                        <div style={{...styles.revenueCard, backgroundColor: '#EFF6FF', borderColor: '#BFDBFE'}}>
                            <div style={styles.multiCurrencyContainer}>
                                {renderTotalRevenue(stats.localBudgetRevenue)}
                            </div>
                            <p style={{...styles.revenueLabel, color: '#1D4ED8'}}>Mahalliy byudjetga</p>
                        </div>
                    </div>

                    <div style={styles.card}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Status bo'yicha taqsimot</h3>
                        {Object.entries(stats.byStatus).map(([status, count]) => {
                            const percentage = (count / stats.totalItems) * 100;
                            return (
                                <div key={status} style={styles.chartBar}>
                                    <div style={styles.barLabel}>{status}</div>
                                    <div style={styles.barContainer}>
                                        <div style={{ ...styles.barFill, width: `${percentage}%` }}>
                                            <span style={styles.barValue}>{count}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* By Type */}
            {selectedReport === 'byType' && (
                <div style={styles.card}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Mol-mulk turlari bo'yicha</h3>
                    {Object.entries(stats.byType).map(([type, count]) => {
                        const percentage = (count / stats.totalItems) * 100;
                        return (
                            <div key={type} style={styles.chartBar}>
                                <div style={styles.barLabel}>{type}</div>
                                <div style={styles.barContainer}>
                                    <div style={{ ...styles.barFill, width: `${percentage}%`, backgroundColor: '#10B981' }}>
                                        <span style={styles.barValue}>{count}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* By Investigator */}
            {selectedReport === 'byInvestigator' && (
                <div style={styles.card}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Tergovchilar statistikasi</h3>
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>Tergovchi</th>
                            <th style={styles.th}>Jami</th>
                            <th style={styles.th}>Yakunlangan</th>
                            <th style={styles.th}>Tushgan mablag'</th>
                            <th style={styles.th}>Bajarilish</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stats.byInvestigator.map((inv) => {
                            const percentage = (inv.completed / inv.count) * 100;
                            return (
                                <tr key={inv.name}>
                                    <td style={styles.td}>{inv.name}</td>
                                    <td style={styles.td}>{inv.count}</td>
                                    <td style={styles.td}>{inv.completed}</td>
                                    <td style={styles.td}>
                                        <div style={styles.multiCurrencyContainer}>
                                            {renderMultipleCurrencies(inv.revenue)}
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.progressBar}>
                                            <div style={{ ...styles.progressFill, width: `${percentage}%` }} />
                                        </div>
                                        <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', display: 'block' }}>
                                            {percentage.toFixed(0)}%
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Revenue Report */}
            {selectedReport === 'revenue' && (
                <>
                    <div style={styles.revenueGrid}>
                        <div style={styles.revenueCard}>
                            <div style={styles.multiCurrencyContainer}>
                                {renderTotalRevenue(stats.totalRevenue)}
                            </div>
                            <p style={styles.revenueLabel}>Jami tushgan mablag'</p>
                        </div>
                        <div style={{...styles.revenueCard, backgroundColor: '#EFF6FF', borderColor: '#BFDBFE'}}>
                            <div style={styles.multiCurrencyContainer}>
                                {renderTotalRevenue(stats.localBudgetRevenue)}
                            </div>
                            <p style={{...styles.revenueLabel, color: '#1D4ED8'}}>Mahalliy byudjetga</p>
                        </div>
                    </div>

                    <div style={styles.card}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Valyuta bo'yicha taqsimot</h3>
                        {Object.entries(stats.revenueByCurrency).map(([currency, amount]) => (
                            <div key={currency} style={styles.chartBar}>
                                <div style={styles.barLabel}>
                                    {currency}
                                    <span style={{...styles.currencyBadge, backgroundColor: getCurrencyColor(currency) + '20', color: getCurrencyColor(currency)}}>
                                        {currency}
                                    </span>
                                </div>
                                <div style={styles.barContainer}>
                                    <div style={{
                                        ...styles.barFill,
                                        width: '100%',
                                        backgroundColor: getCurrencyColor(currency)
                                    }}>
                                        <span style={styles.barValue}>
                                            {formatCurrency(amount, currency)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={styles.card}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Mol-mulk turi bo'yicha tushgan mablag'lar</h3>
                        {Object.entries(stats.revenueByType).map(([type, revenue]) => (
                            <div key={type} style={styles.chartBar}>
                                <div style={styles.barLabel}>{type}</div>
                                <div style={styles.barContainer}>
                                    <div style={{ ...styles.barFill, width: '100%', backgroundColor: '#8B5CF6' }}>
                                        <span style={styles.barValue}>
                                            <div style={styles.multiCurrencyContainer}>
                                                {renderMultipleCurrencies(revenue)}
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Timeline */}
            {selectedReport === 'timeline' && (
                <div style={styles.card}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                        <TrendingUp size={20} style={{ display: 'inline', marginRight: '8px' }} />
                        Oylik tendensiya
                    </h3>
                    {stats.monthlyTrend.map((month) => {
                        const maxCount = Math.max(...stats.monthlyTrend.map(m => m.count));
                        const percentage = (month.count / maxCount) * 100;
                        return (
                            <div key={month.month} style={styles.chartBar}>
                                <div style={styles.barLabel}>
                                    {month.month}
                                    <br />
                                    <small style={{ fontSize: '12px', color: '#6B7280' }}>
                                        <div style={styles.multiCurrencyContainer}>
                                            {renderMultipleCurrencies(month.revenue)}
                                        </div>
                                    </small>
                                </div>
                                <div style={styles.barContainer}>
                                    <div style={{ ...styles.barFill, width: `${percentage}%`, backgroundColor: '#F59E0B' }}>
                                        <span style={styles.barValue}>{month.count} ta</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ReportsPage;