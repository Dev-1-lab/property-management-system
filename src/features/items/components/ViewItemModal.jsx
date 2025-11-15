import React from 'react';
import { X } from 'lucide-react';

const ViewItemModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-100/60 to-gray-300/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-xl">

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Mol-mulk haqida</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="space-y-3">
                    <p><strong>Nomi:</strong> {item.name}</p>
                    <p><strong>Turi:</strong> {item.type}</p>
                    <p><strong>Statusi:</strong> {item.status}</p>
                    <p><strong>Yaratilgan sana:</strong> {item.createdAt}</p>
                    <p><strong>Tergovchi:</strong> {item.investigator}</p>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Yopish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewItemModal;
