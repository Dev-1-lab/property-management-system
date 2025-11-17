import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Users, Shield, LogOut, FileText, BarChart, Send, Microscope, Scale, Gavel, DollarSign,LucideWarehouse ,ArrowRight,LucidePaperclip  } from 'lucide-react';
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
            label: 'Olib qo\'yilgan mol-mulklar',
            icon: Package,
            path: '/items',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.TASDIQLOVCHI, USER_ROLES.MONITORING, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'expertise',
            label: 'Ekspertizadan o\'tkazish va baholash',
            icon: Microscope,
            path: '/expertise',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'storage',
            label: 'Saqlash joyi',
            icon: LucideWarehouse,
            path: '/storage',
            roles: [USER_ROLES.TASDIQLOVCHI, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'material',
            label: 'Materialni sudga topshirish',
            icon: LucidePaperclip  ,
            path: '/material',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'decision',
            label: 'Sud yoki boshqa organ qarori',
            icon: Scale,
            path: '/decision',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR],
        },
        {
            id: 'revenue',
            label: 'Tushgan mablag\'',
            icon: DollarSign,
            path: '/revenue',
            roles: [USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR],
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
        <div className="w-72 bg-indigo-800 text-white flex flex-col h-screen">
            {/* Header */}
            <div className="p-3 border-b border-indigo-700">
                <div className="flex items-center space-x-3">
                    <Shield className="w-20 h-20" />
                    <div>
                        <h1 className="text-lg font-bold">Mol-mulk xarakatini hisobga olish tizimi </h1>
                        <p className="text-xs text-indigo-200">{user?.role}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-3 overflow-y-auto">
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
                        <span className="font-normal ">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-indigo-700">
                <div className="mb-3">
                    <p className="text-lg font-medium">{user?.name}</p>
                    <p className="text-sm text-indigo-200">{user?.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full  py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Chiqish</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;