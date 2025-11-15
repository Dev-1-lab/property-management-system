import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Users, Shield, LogOut, FileText, BarChart,Wallet,ChartPie } from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';
import { USER_ROLES } from '../../utils/constants';

const Sidebar = () => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Bosh sahifa',
            icon: Home,
            path: '/dashboard',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.TASDIQLOVCHI, USER_ROLES.MONITORING, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'items',
            label: 'Mol-mulk',
            icon: Package,
            path: '/items',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.TASDIQLOVCHI, USER_ROLES.MONITORING, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'expertise',
            label: 'Ekspertiza',
            icon: FileText,
            path: '/expertise',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'storage',
            label: 'Saqlash',
            icon: Shield,
            path: '/storage',
            roles: [USER_ROLES.TASDIQLOVCHI, USER_ROLES.MONITORING, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'decision',
            label: 'Sud qarori',
            icon: FileText,
            path: '/decision',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'revenue',
            label: 'Tushgan mablag\'',
            icon: Wallet,
            path: '/revenue',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.MONITORING, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'reports',
            label: 'Hisobotlar',
            icon: ChartPie,
            path: '/reports',
            roles: [USER_ROLES.MONITORING, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'users',
            label: 'Foydalanuvchilar',
            icon: Users,
            path: '/users',
            roles: [USER_ROLES.ADMINISTRATOR],
        },
    ];

    const filteredMenu = menuItems.filter((item) =>
        item.roles.includes(user?.role)
    );

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="w-64 bg-indigo-800 text-white flex flex-col h-screen">
            {/* Header */}
            <div className="p-6 border-b border-indigo-700">
                <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8" />
                    <div>
                        <h1 className="text-lg font-bold">Mol-mulk tizimi</h1>
                        <p className="text-xs text-indigo-200">{user?.role}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
                {filteredMenu.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                            isActive(item.path)
                                ? 'bg-indigo-900 text-white'
                                : 'text-indigo-100 hover:bg-indigo-700'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-indigo-700">
                <div className="mb-3">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-indigo-200">{user?.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Chiqish</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;