import React, {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const MainLayout = ({ title }) => {
    const [notificationItemId, setNotificationItemId] = useState(null);
    const navigate = useNavigate();

    const handleNotificationItemClick = (itemId) => {
        setNotificationItemId(itemId);
        navigate('/items'); // ItemsPage'ga yo'naltirish
    };
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <TopBar
                    title={title}
                    onNotificationItemClick={handleNotificationItemClick}
                />
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet context={{ notificationItemId, setNotificationItemId }} />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;