import React, { useState, useEffect } from 'react';
import { Package, Shield, FileText, Check, TrendingUp, Clock } from 'lucide-react';
import { statisticsAPI, itemsAPI } from '../utils/api';
import StatusBadge from '../features/items/components/StatusBadge';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inExpertise: 0,
        completed: 0,
    });
    const [recentItems, setRecentItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const mockItems = [
        {
            id: 1,
            name: 'Ofis stoli',
            type: 'Mebel',
            status: 'SAQLASHGA_YUBORILGAN',
            createdAt: '2025-11-01',
            investigator: 'Aliyev Jasur',
        },
        {
            id: 2,
            name: 'Kompyuter',
            type: 'Elektronika',
            status: 'TASDIQLANGAN',
            createdAt: '2025-10-28',
            investigator: 'Karimova Nigora',
        },
        {
            id: 3,
            name: 'Printer',
            type: 'Elektronika',
            status: 'YANGI',
            createdAt: '2025-10-15',
            investigator: 'Sodiqov Botir',
        },
        {
            id: 4,
            name: 'Kreslo',
            type: 'Mebel',
            status: 'SAQLASHGA_YUBORILGAN',
            createdAt: '2025-11-05',
            investigator: 'Aliyev Jasur',
        },
        {
            id: 5,
            name: 'Proyektor',
            type: 'Elektronika',
            status: 'TASDIQLANGAN',
            createdAt: '2025-09-20',
            investigator: 'Karimova Nigora',
        },
    ];

    const loadDashboardData = async () => {
        try {
            const [statsResponse, itemsResponse] = await Promise.all([
                statisticsAPI.getDashboard(),
                itemsAPI.getAll({ limit: 5, sortBy: 'createdAt', sortOrder: 'DESC' }),
            ]);

            setStats(statsResponse.data);

            // ⭐ AGAR API bo‘sh qaytsa → mockItems ni ishlat
            setRecentItems(
                itemsResponse.data.items?.length ? itemsResponse.data.items : mockItems
            );

        } catch (error) {
            console.error('Failed to load dashboard data:', error);

            // ⭐ API ishlamasa → mockItems ko‘rsat
            setRecentItems(mockItems);

        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            label: 'Jami mol-mulk',
            value: stats.total,
            icon: Package,
            color: 'bg-blue-500',
            trend: '+12%',
        },
        {
            label: 'Tasdiqlash kutilmoqda',
            value: stats.pending,
            icon: Clock,
            color: 'bg-yellow-500',
            trend: '+5%',
        },
        {
            label: 'Ekspertizada',
            value: stats.inExpertise,
            icon: FileText,
            color: 'bg-purple-500',
            trend: '-3%',
        },
        {
            label: 'Yakunlangan',
            value: stats.completed,
            icon: Check,
            color: 'bg-green-500',
            trend: '+18%',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <h1
                className="text-3xl font-bold text-gray-800 mb-6"
            >
                Bosh sahifa
            </h1>

            {/* Statistics Cards */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14"
            >
                {statCards.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl shadow-lg p-8 min-h-[160px] flex flex-col justify-between"

                    >
                        <div className="flex items-center justify-between">
                            <div
                                className={`${stat.color} p-4 rounded-xl`}
                            >
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>

                            <div
                                className="flex items-center space-x-1"
                            >
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-semibold text-green-600">
                                    {stat.trend}
                                </span>
                            </div>
                        </div>

                        <div
                            className="mt-4"
                        >
                            <p className="text-gray-600 text-sm">{stat.label}</p>
                            <p className="text-4xl font-bold text-gray-900 mt-1">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Items */}
            <div
                className="bg-white rounded-lg shadow-md p-6 mt-10"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2
                        className="text-xl font-bold text-gray-800"
                    >
                        So'nggi faoliyat
                    </h2>
                    <a
                        href="/items"
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Barchasini ko'rish →
                    </a>
                </div>

                <div className="space-y-3" >
                    {recentItems.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            Hozircha faoliyat yo'q
                        </p>
                    ) : (
                        recentItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-indigo-100 p-2 rounded-lg">
                                        <Package className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800"  >{item.name}  </p>
                                        <p className="text-sm text-gray-600">
                                            {item.investigator} • {item.createdAt}
                                        </p>
                                    </div>
                                </div>

                                <StatusBadge status={item.status} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
