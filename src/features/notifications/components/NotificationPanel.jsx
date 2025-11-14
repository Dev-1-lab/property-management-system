import React, { useState, useEffect } from 'react';
import { X, CheckCheck } from 'lucide-react';
import { notificationsAPI } from '../../../utils/api';

const NotificationPanel = ({ onClose, onUnreadCountChange }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            const response = await notificationsAPI.getAll();
            setNotifications(response.data.notifications);

            const unreadCount = response.data.notifications.filter(n => !n.read).length;
            onUnreadCountChange?.(unreadCount);
        } catch (error) {
            console.error('Failed to load notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await notificationsAPI.markAsRead(id);
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
            await notificationsAPI.markAllAsRead();
            setNotifications((prev) =>
                prev.map((notif) => ({ ...notif, read: true }))
            );
            onUnreadCountChange?.(0);
        } catch (error) {
            console.error('Failed to mark all as read:', error);
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

    return (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Bildirishnomalar</h3>
                <div className="flex items-center space-x-2">
                    {notifications.some(n => !n.read) && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                        >
                            <CheckCheck className="w-4 h-4" />
                            <span>Hammasini o'qilgan</span>
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
            <div className="max-h-96 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        Bildirishnomalar yo'q
                    </div>
                ) : (
                    notifications.map((notif) => (
                        <div
                            key={notif.id}
                            onClick={() => !notif.read && handleMarkAsRead(notif.id)}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                                !notif.read ? 'bg-blue-50' : ''
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-800">{notif.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatTime(notif.createdAt)}
                                    </p>
                                </div>
                                {!notif.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2"></div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 text-center">
                    <a
                        href="/notifications"
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Barchasini ko'rish
                    </a>
                </div>
            )}
        </div>
    );
};

export default NotificationPanel;