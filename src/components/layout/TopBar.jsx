import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';
import NotificationPanel from '../../features/notifications/components/NotificationPanel';

const TopBar = ({ title }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);
    const { user } = useAuth();

    return (
        <div className="bg-white shadow-sm px-6 py-12 min-h-12 flex items-center justify-between">
            {/* Left side - Title */}
            <div className="flex items-center space-x-6">
                <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            </div>

            {/* Right side - Notifications & User Profile */}
            <div className="flex items-center space-x-8">
                {/* Notifications */}
                <div className="relative ">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-3 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Bell className="w-7 h-7 mr-12" style={{marginRight: '30px'}}/>
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" style={{marginTop: '-10px' ,marginRight: '20px'}}>
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <NotificationPanel
                            onClose={() => setShowNotifications(false)}
                            onUnreadCountChange={setUnreadCount}
                        />
                    )}
                </div>

                {/* User Profile */}
                <div className="relative mr-6" style={{marginRight: '30px'}}>
                    <button className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-base font-medium">
                            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
                        </div>
                        <span className="text-base font-medium text-gray-800 hidden md:block">
                            {user?.name || 'User'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopBar;