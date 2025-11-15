import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Users, Shield, LogOut, FileText, BarChart } from 'lucide-react';
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
            id: 'storage',
            label: 'Saqlash',
            icon: Shield,
            path: '/storage',
            roles: [USER_ROLES.TASDIQLOVCHI, USER_ROLES.MONITORING, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'expertise',
            label: 'Ekspertiza',
            icon: FileText,
            path: '/expertise',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.MONITORING, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'reports',
            label: 'Hisobotlar',
            icon: BarChart,
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
        <div className="w-64 bg-indigo-900 text-white h-screen flex flex-col justify-between shadow-lg">
            {/* Header */}
            <div className="p-4 border-b border-indigo-800">
                <div className="flex items-center space-x-6">
                    <Shield className="w-12 h-12 text-indigo-300" />
                    <div>
                        <h1 className="text-xl font-semibold">FinControl</h1>
                        <p className="text-sm text-indigo-400">{user?.role}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="px-3 py-5 flex-1 overflow-y-auto">
                {filteredMenu.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`flex items-center space-x-4 px-5 py-3 rounded-lg mb-2 text-base transition-all duration-200 ${
                            isActive(item.path)
                                ? 'bg-indigo-700 text-white font-medium'
                                : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
                        }`}
                    >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-indigo-800 bg-indigo-950">

                <div className="mb-2">
                    <p className="text-lg font-medium text-indigo-100">{user?.name}</p>
                    <p className="text-base text-indigo-400">{user?.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-4 w-full px-6 py-3.5 rounded-lg bg-indigo-800 hover:bg-indigo-700 transition-colors text-lg text-indigo-200 hover:text-white"
                >
                    <LogOut className="w-7 h-7" />
                    <span>Chiqish</span>
                </button>

            </div>
        </div>
    );
};

export default Sidebar;