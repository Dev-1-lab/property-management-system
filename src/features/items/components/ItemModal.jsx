import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import { ITEM_TYPES, STORAGE_LOCATIONS } from '../../../utils/constants';

const ItemModal = ({ item, onClose, onSave }) => {
    const [caseInfo, setCaseInfo] = useState({
        caseNumber: '',
        caseName: '',
        seizureProtocol: '',
        description: '', // Tavsifni ish yurituvga ko'chirdik
        file: null, // Hujjatni ish yurituvga ko'chirdik
    });

    const [items, setItems] = useState([{
        id: Date.now(),
        name: '',
        type: ITEM_TYPES.TRANSPORT,
        unit: 'dona',
        quantity: 1,
        location: '1-ombor',
    }]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (item) {
            setCaseInfo({
                caseNumber: item.caseNumber || '',
                caseName: item.caseName || '',
                seizureProtocol: item.seizureProtocol || '',
                description: item.description || '', // Tavsifni ish yurituvga ko'chirdik
                file: item.file || null, // Hujjatni ish yurituvga ko'chirdik
            });
            setItems([{
                id: Date.now(),
                name: item.name || '',
                type: item.type || ITEM_TYPES.TRANSPORT,
                unit: item.unit || 'dona',
                quantity: item.quantity || 1,
                location: item.location || '1-ombor',
            }]);
        }
    }, [item]);

    const handleCaseInfoChange = (e) => {
        const { name, value } = e.target;
        setCaseInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCaseFileChange = (file) => {
        setCaseInfo((prev) => ({
            ...prev,
            file,
        }));
    };

    const handleItemChange = (id, field, value) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const addNewItem = () => {
        setItems((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: '',
                type: ITEM_TYPES.TRANSPORT,
                unit: 'dona',
                quantity: 1,
                location: '1-ombor',
            },
        ]);
    };

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems((prev) => prev.filter((item) => item.id !== id));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Har bir mol-mulkni ish yuritish ma'lumotlari bilan birlashtirish
            for (const itemData of items) {
                const fullData = {
                    ...caseInfo, // Tavsif va fayl endi caseInfo ichida
                    name: itemData.name,
                    type: itemData.type,
                    unit: itemData.unit,
                    quantity: itemData.quantity,
                    location: itemData.location,
                };
                await onSave(fullData);
            }
            onClose();
        } catch (error) {
            console.error('Failed to save:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {item ? 'Mol-mulkni tahrirlash' : 'Yangi mol-mulk qo\'shish'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Case Information */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Ish yuritish ma'lumotlari</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ish yuritish raqami *
                            </label>
                            <input
                                type="text"
                                name="caseNumber"
                                value={caseInfo.caseNumber}
                                onChange={handleCaseInfoChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Masalan: JY-2025/123"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ish yuritish nomi *
                            </label>
                            <input
                                type="text"
                                name="caseName"
                                value={caseInfo.caseName}
                                onChange={handleCaseInfoChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Masalan: Korrupsiya ishi - Toshkent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Olib qo'yish dalolatnomasining raqami *
                            </label>
                            <input
                                type="text"
                                name="seizureProtocol"
                                value={caseInfo.seizureProtocol}
                                onChange={handleCaseInfoChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Masalan: OQD-45/2025"
                                required
                            />
                        </div>

                        {/* Tavsif - Endi ish yurituv uchun */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tavsif
                            </label>
                            <textarea
                                name="description"
                                value={caseInfo.description}
                                onChange={handleCaseInfoChange}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Ish yuritish haqida qo'shimcha ma'lumotlar..."
                            ></textarea>
                        </div>

                        {/* Hujjat yuklash - Endi ish yurituv uchun */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hujjat yuklash
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors">
                                <input
                                    type="file"
                                    onChange={(e) => handleCaseFileChange(e.target.files[0])}
                                    className="hidden"
                                    id="case-file-upload"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />
                                <label
                                    htmlFor="case-file-upload"
                                    className="cursor-pointer flex flex-col items-center"
                                >
                                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600">
                                        {caseInfo.file ? caseInfo.file.name : 'Faylni tanlang'}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        PDF, DOC, JPG, PNG (max 10MB)
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">Mol-mulklar</h3>
                        <button
                            type="button"
                            onClick={addNewItem}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            disabled={loading}
                        >
                            <Plus className="w-5 h-5" />
                            <span>Yana qo'shish</span>
                        </button>
                    </div>

                    {items.map((itemData, index) => (
                        <div key={itemData.id} className="border-2 border-gray-200 rounded-lg p-4 relative">
                            {/* Item Number and Delete Button */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-semibold text-indigo-600">
                                    Mol-mulk #{index + 1}
                                </span>
                                {items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeItem(itemData.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        disabled={loading}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mol-mulk nomi *
                                    </label>
                                    <input
                                        type="text"
                                        value={itemData.name}
                                        onChange={(e) => handleItemChange(itemData.id, 'name', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Masalan: Avtomobil Toyota Camry"
                                        required
                                    />
                                </div>

                                {/* Type and Location */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Turi *
                                        </label>
                                        <select
                                            value={itemData.type}
                                            onChange={(e) => handleItemChange(itemData.id, 'type', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            {Object.entries(ITEM_TYPES).map(([key, value]) => (
                                                <option key={key} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Saqlash joyi *
                                        </label>
                                        <select
                                            value={itemData.location}
                                            onChange={(e) => handleItemChange(itemData.id, 'location', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            {STORAGE_LOCATIONS.map((loc) => (
                                                <option key={loc.id} value={loc.id}>
                                                    {loc.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Unit and Quantity */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            O'lchov birligi *
                                        </label>
                                        <select
                                            value={itemData.unit}
                                            onChange={(e) => handleItemChange(itemData.id, 'unit', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="dona">dona</option>
                                            <option value="kg">kg</option>
                                            <option value="litr">litr</option>
                                            <option value="metr">metr</option>
                                            <option value="m²">m²</option>
                                            <option value="to'plam">to'plam</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Soni *
                                        </label>
                                        <input
                                            type="number"
                                            value={itemData.quantity}
                                            onChange={(e) => handleItemChange(itemData.id, 'quantity', parseFloat(e.target.value))}
                                            min="0.01"
                                            step="0.01"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                        disabled={loading}
                    >
                        Bekor qilish
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Saqlanmoqda...' : `${items.length} ta mol-mulkni saqlash`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemModal;