import React, { useState, useEffect } from 'react';
import { X, CheckCheck, Package, FileText, AlertCircle, CheckCircle } from 'lucide-react';

// Mock notifications data
const mockNotifications = [
    {
        id: 1,
        type: 'TASDIQLANGAN',
        message: 'Noutbuk Lenovo ThinkPad X1 uchun saqlash tasdiqlandi',
        itemId: 1,
        itemName: 'Noutbuk Lenovo ThinkPad X1',
        caseNumber: 'JY-2025/123',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
        id: 2,
        type: 'EKSPERTIZA',
        message: 'Proyektor Epson X500 uchun ekspertiza natijalari kiritildi',
        itemId: 2,
        itemName: 'Proyektor Epson X500',
        caseNumber: 'JY-2025/087',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
        id: 3,
        type: 'SUD_QARORI',
        message: 'Noutbuk Lenovo ThinkPad X1 uchun sud qarori kiritildi - Davlat daromadiga',
        itemId: 1,
        itemName: 'Noutbuk Lenovo ThinkPad X1',
        caseNumber: 'JY-2025/123',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    {
        id: 4,
        type: 'TUSHGAN_MABLAG',
        message: '7,000,000 so\'m mablag\' tushdi - Noutbuk Lenovo ThinkPad X1',
        itemId: 1,
        itemName: 'Noutbuk Lenovo ThinkPad X1',
        caseNumber: 'JY-2025/123',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
    },
    {
        id: 5,
        type: 'YANGI_ITEM',
        message: 'Yangi mol-mulk qo\'shildi: Ofis kreslosi - 5 dona',
        itemId: 3,
        itemName: 'Ofis kreslosi',
        caseNumber: 'JY-2025/156',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
    },
];

const NotificationPanel = ({ onClose, onUnreadCountChange, onItemClick }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setNotifications(mockNotifications);

            const unreadCount = mockNotifications.filter(n => !n.read).length;
            onUnreadCountChange?.(unreadCount);
        } catch (error) {
            console.error('Failed to load notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            setNotifications((prev) =>
                prev.map((notif) =>
                    notif.id === id ? { ...notif, read: true } : notif
                )
            );

            const unreadCount = notifications.filter(n => !n.read && n.id !== id).length;
            onUnreadCountChange?.(unreadCount);
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            setNotifications((prev) =>
                prev.map((notif) => ({ ...notif, read: true }))
            );
            onUnreadCountChange?.(0);
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const handleNotificationClick = (notif) => {
        if (!notif.read) {
            handleMarkAsRead(notif.id);
        }
        // Call parent handler to open ItemViewModal
        if (onItemClick && notif.itemId) {
            onItemClick(notif.itemId);
            onClose(); // Close notification panel
        }
    };

    const formatTime = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = Math.floor((now - time) / 1000); // seconds

        if (diff < 60) return `${diff} soniya oldin`;
        if (diff < 3600) return `${Math.floor(diff / 60)} daqiqa oldin`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} soat oldin`;
        return `${Math.floor(diff / 86400)} kun oldin`;
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'TASDIQLANGAN':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'EKSPERTIZA':
                return <FileText className="w-5 h-5 text-blue-500" />;
            case 'SUD_QARORI':
                return <AlertCircle className="w-5 h-5 text-orange-500" />;
            case 'TUSHGAN_MABLAG':
                return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case 'YANGI_ITEM':
                return <Package className="w-5 h-5 text-indigo-500" />;
            default:
                return <Package className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-800">Bildirishnomalar</h3>
                    {notifications.filter(n => !n.read).length > 0 && (
                        <p className="text-xs text-gray-500 mt-0.5">
                            {notifications.filter(n => !n.read).length} ta o'qilmagan
                        </p>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    {notifications.some(n => !n.read) && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center space-x-1 transition-colors"
                            title="Hammasini o'qilgan qilish"
                        >
                            <CheckCheck className="w-4 h-4" />
                            <span>Hammasi</span>
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="max-h-[450px] overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Bildirishnomalar yo'q</p>
                    </div>
                ) : (
                    notifications.map((notif) => (
                        <div
                            key={notif.id}
                            onClick={() => handleNotificationClick(notif)}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all ${
                                !notif.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'
                            }`}
                        >
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    {getNotificationIcon(notif.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
                                        {notif.message}
                                    </p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <span className="text-xs font-medium text-indigo-600">
                                            {notif.caseNumber}
                                        </span>
                                        <span className="text-xs text-gray-400">•</span>
                                        <span className="text-xs text-gray-500">
                                            {formatTime(notif.createdAt)}
                                        </span>
                                    </div>
                                </div>
                                {!notif.read && (
                                    <div className="flex-shrink-0">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 text-center bg-gray-50">
                    <a
                        href="/notifications"
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                    >
                        Barchasini ko'rish
                    </a>
                </div>
            )}
        </div>
    );
};

export default NotificationPanel;