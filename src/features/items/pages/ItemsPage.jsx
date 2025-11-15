import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, Eye, Edit, Check } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { USER_ROLES } from '../../../utils/constants';
import StatusBadge from '../components/StatusBadge';
import ItemModal from '../components/ItemModal';

// Mock data
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

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        dateFrom: '',
        dateTo: '',
    });
    const { user } = useAuth();
    const canEdit = [USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR].includes(user?.role);
    const canConfirm = user?.role === USER_ROLES.TASDIQLOVCHI;

    useEffect(() => {
        loadItems();
    }, [filters, searchTerm]);

    const loadItems = async () => {
        try {
            setLoading(true);
            // Simulate filtering and searching with mock data
            let filteredItems = [...mockItems];

            // Apply search
            if (searchTerm) {
                filteredItems = filteredItems.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.investigator.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // Apply filters
            if (filters.status) {
                filteredItems = filteredItems.filter((item) => item.status === filters.status);
            }
            if (filters.type) {
                filteredItems = filteredItems.filter((item) => item.type === filters.type);
            }
            if (filters.dateFrom) {
                filteredItems = filteredItems.filter((item) => item.createdAt >= filters.dateFrom);
            }
            if (filters.dateTo) {
                filteredItems = filteredItems.filter((item) => item.createdAt <= filters.dateTo);
            }

            setItems(filteredItems);
        } catch (error) {
            console.error('Failed to load items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleSave = async (data) => {
        try {
            if (selectedItem) {
                // Simulate updating item
                console.log('Updating item:', selectedItem.id, data);
            } else {
                // Simulate creating new item
                console.log('Creating new item:', data);
            }
            setShowModal(false);
            loadItems();
        } catch (error) {
            console.error('Failed to save item:', error);
        }
    };

    const handleExport = async () => {
        try {
            // Simulate export
            console.log('Exporting filtered items:', items);
            const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `mol-mulk-${Date.now()}.json`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Failed to export:', error);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Mol-mulk ro'yxati</h1>
                {canEdit && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Yangi qo'shish</span>
                    </button>
                )}
            </div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6" >
                <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Universal qidiruv..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Filter className="w-5 h-5" />
                        <span>Filter</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <Download className="w-5 h-5" />
                        <span>Export</span>
                    </button>
                </div>
            </div>
            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <table className="w-full" >
                        <thead className="bg-gray-200 border-b-8   border-t-8 border-gray-200 ">
                        <tr>
                            <th className="px-6 py-3 pl-8 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nomi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Turi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Holati
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sana
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tergovchi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amallar
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                    Hech qanday ma'lumot topilmadi
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {item.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {item.createdAt}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {item.investigator}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                <Eye className="w-4 h-4 text-gray-600" />
                                            </button>
                                            {canEdit && (
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                >
                                                    <Edit className="w-4 h-4 text-indigo-600" />
                                                </button>
                                            )}
                                            {canConfirm && item.status === 'SAQLASHGA_YUBORILGAN' && (
                                                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                    <Check className="w-4 h-4 text-green-600" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                )}
            </div>
            {/* Modal */}
            {showModal && (
                <ItemModal
                    item={selectedItem}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default ItemsPage;