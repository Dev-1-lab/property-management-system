import React, { useState, useEffect } from 'react';
import { Plus, Edit, X, Shield, Lock } from 'lucide-react';
import { usersAPI } from '../../../utils/api';
import { USER_ROLES, ROLE_LABELS } from '../../../utils/constants';
import UserModal from '../components/UserModal';
import Pagination from '../../../components/ui/Pagination';
import { useToast } from '../../../components/ui/Toast';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { showSuccess, showError, showWarning } = useToast();

    useEffect(() => {
        loadUsers();
    }, [currentPage, itemsPerPage]);

    const loadUsers = async () => {
        try {
            const response = await usersAPI.getAll();
            setAllUsers(response.data.users);

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setUsers(response.data.users.slice(startIndex, endIndex));
        } catch (error) {
            console.error('Failed to load users:', error);
            showError('Foydalanuvchilarni yuklashda xatolik');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedUser(null);
        setShowModal(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleSave = async (data) => {
        try {
            if (selectedUser) {
                await usersAPI.update(selectedUser.id, data);
                showSuccess('Foydalanuvchi muvaffaqiyatli yangilandi');
            } else {
                await usersAPI.create(data);
                showSuccess('Yangi foydalanuvchi qo\'shildi');
            }
            setShowModal(false);
            loadUsers();
        } catch (error) {
            console.error('Failed to save user:', error);
            showError('Saqlashda xatolik yuz berdi');
        }
    };

    const handleToggleStatus = async (user) => {
        try {
            const newStatus = user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
            await usersAPI.updateStatus(user.id, newStatus);
            showSuccess(`Foydalanuvchi ${newStatus === 'ACTIVE' ? 'aktivlashtirildi' : 'bloklandi'}`);
            loadUsers();
        } catch (error) {
            console.error('Failed to toggle user status:', error);
            showError('Status o\'zgartirishda xatolik');
        }
    };

    const getRoleBadgeColor = (role) => {
        const colors = {
            [USER_ROLES.ADMINISTRATOR]: 'bg-red-100 text-red-800',
            [USER_ROLES.TERGOVCHI]: 'bg-blue-100 text-blue-800',
            [USER_ROLES.TASDIQLOVCHI]: 'bg-green-100 text-green-800',
            [USER_ROLES.MONITORING]: 'bg-purple-100 text-purple-800',
        };
        return colors[role] || 'bg-gray-100 text-gray-800';
    };

    const stats = {
        [USER_ROLES.TERGOVCHI]: allUsers.filter(u => u.role === USER_ROLES.TERGOVCHI).length,
        [USER_ROLES.TASDIQLOVCHI]: allUsers.filter(u => u.role === USER_ROLES.TASDIQLOVCHI).length,
        [USER_ROLES.MONITORING]: allUsers.filter(u => u.role === USER_ROLES.MONITORING).length,
        [USER_ROLES.ADMINISTRATOR]: allUsers.filter(u => u.role === USER_ROLES.ADMINISTRATOR).length,
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Foydalanuvchilar</h1>
                    <p className="text-gray-600 mt-1">Tizim foydalanuvchilarini boshqarish</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Yangi foydalanuvchi</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {Object.entries(USER_ROLES).map(([key, role]) => {
                    return (
                        <div key={key} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">{ROLE_LABELS[role]}</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">{stats[role]}</p>
                                </div>
                                <Shield className="w-8 h-8 text-indigo-600" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Foydalanuvchi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rol
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Holat
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amallar
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    Foydalanuvchilar topilmadi
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {user.name.charAt(0)}
                          </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    ID: {user.id}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {ROLE_LABELS[user.role]}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status === 'ACTIVE' ? 'Faol' : 'Bloklangan'}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                title="Tahrirlash"
                                            >
                                                <Edit className="w-4 h-4 text-indigo-600" />
                                            </button>
                                            <button
                                                onClick={() => handleToggleStatus(user)}
                                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                title={user.status === 'ACTIVE' ? 'Bloklash' : 'Aktivlashtirish'}
                                            >
                                                <Lock className={`w-4 h-4 ${
                                                    user.status === 'ACTIVE' ? 'text-red-600' : 'text-green-600'
                                                }`} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                )}

                {/* Pagination */}
                {!loading && users.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(allUsers.length / itemsPerPage)}
                        totalItems={allUsers.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={(page) => setCurrentPage(page)}
                        onItemsPerPageChange={(perPage) => {
                            setItemsPerPage(perPage);
                            setCurrentPage(1);
                        }}
                    />
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default AdminPage;