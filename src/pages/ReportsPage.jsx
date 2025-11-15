import React, { useState } from 'react';
import { BarChart, Download, FileText, Calendar, TrendingUp, Package, Users, Clock } from 'lucide-react';

const ReportsPage = () => {
    const [dateRange, setDateRange] = useState({
        from: '2025-11-01',
        to: '2025-11-15',
    });
    const [selectedReport, setSelectedReport] = useState('overview');

    // Mock statistics data
    const stats = {
        totalItems: 156,
        confirmed: 121,
        inExpertise: 12,
        completed: 23,
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
            { name: 'A.Karimov', count: 67, completed: 54 },
            { name: 'B.Rahimov', count: 45, completed: 38 },
            { name: 'S.Toshmatov', count: 34, completed: 29 },
            { name: 'N.Umarova', count: 10, completed: 0 },
        ],
        monthlyTrend: [
            { month: 'Sentabr', count: 42 },
            { month: 'Oktabr', count: 58 },
            { month: 'Noyabr', count: 56 },
        ],
    };

    const reportTypes = [
        { id: 'overview', name: 'Umumiy hisobot', icon: BarChart },
        { id: 'byType', name: 'Tur bo\'yicha', icon: Package },
        { id: 'byInvestigator', name: 'Tergovchi bo\'yicha', icon: Users },
        { id: 'timeline', name: 'Vaqt bo\'yicha', icon: Clock },
    ];

    const handleExport = (format) => {
        console.log(`Exporting ${selectedReport} as ${format}`);
        alert(`Hisobot ${format.toUpperCase()} formatida yuklanmoqda...`);
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
        barLabel: { width: '120px', fontSize: '14px', color: '#374151',marginRight: '75px' },
        barContainer: { flex: 1, height: '32px', backgroundColor: '#F3F4F6', borderRadius: '4px', position: 'relative', overflow: 'hidden' },
        barFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px' },
        barValue: { color: 'white', fontSize: '12px', fontWeight: '600' },
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
                                <div style={styles.barLabel}>{month.month}</div>
                                <div style={styles.barContainer}>
                                    <div style={{ ...styles.barFill, width: `${percentage}%`, backgroundColor: '#F59E0B' }}>
                                        <span style={styles.barValue}>{month.count}</span>
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