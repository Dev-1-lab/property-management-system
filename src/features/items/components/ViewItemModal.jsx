import React from 'react';
import { X } from 'lucide-react';

const Block = ({ title, children }) => (
    <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-2 text-gray-800">{title}</h3>
        <div className="space-y-1 text-sm">{children}</div>
    </div>
);

const ViewItemModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-100/50 to-gray-300/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-xl overflow-y-auto max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Mol-mulk tafsilotlari</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="space-y-4">

                    {/* Olib qo‘yish */}
                    <Block title="Mol-mulkni olib qo‘yish">
                        <p><strong>Dalolatnoma:</strong> {item.olibQoyish.dalolatnoma}</p>
                        <p><strong>Sanasi:</strong> {item.olibQoyish.dalolatnomaSana}</p>
                        <p><strong>Mol-mulk nomi:</strong> {item.olibQoyish.molMulkNomi}</p>
                        <p><strong>O‘lchov birligi:</strong> {item.olibQoyish.oichovBirligi}</p>
                        <p><strong>Soni:</strong> {item.olibQoyish.soni}</p>
                    </Block>

                    {/* Ekspertiza */}
                    <Block title="Ekspertiza">
                        <p><strong>Xulosa №:</strong> {item.ekspertiza.number}</p>
                        <p><strong>Sanasi:</strong> {item.ekspertiza.sana}</p>
                        <p><strong>Xulosa:</strong> {item.ekspertiza.xulosa}</p>
                    </Block>

                    {/* Baholash */}
                    <Block title="Baholash">
                        <p><strong>Hisobot №:</strong> {item.baholash.hisobotNumber}</p>
                        <p><strong>Sanasi:</strong> {item.baholash.hisobotSana}</p>
                        <p><strong>Bahosi:</strong> {item.baholash.bahosi.toLocaleString()} so‘m</p>
                        <p><strong>Summasi:</strong> {item.baholash.summasi.toLocaleString()} so‘m</p>
                    </Block>

                    {/* Saqlash joyi */}
                    <Block title="Saqlash joyi">
                        <p><strong>Hujjat №:</strong> {item.saqlash.hujjatNumber}</p>
                        <p><strong>Sanasi:</strong> {item.saqlash.hujjatSana}</p>
                        <p><strong>Tashkilot:</strong> {item.saqlash.tashkilotNomi}</p>
                    </Block>

                    {/* Sudga topshirish */}
                    <Block title="Materialni sudga topshirish">
                        <p><strong>Sanasi:</strong> {item.sudgaTopshirish.sana}</p>
                        <p><strong>Hujjat:</strong> {item.sudgaTopshirish.hujjat}</p>
                        <p><strong>№:</strong> {item.sudgaTopshirish.number}</p>
                        <p><strong>Soni:</strong> {item.sudgaTopshirish.soni}</p>
                    </Block>

                    {/* Sud qarori */}
                    <Block title="Sud yoki boshqa organ qarori">
                        <p><strong>Davlat daromadiga o‘tkazildi:</strong>
                            {item.sudQarori.davlatDaromadiga.soni} dona — {item.sudQarori.davlatDaromadiga.summasi.toLocaleString()} so‘m
                            ({item.sudQarori.davlatDaromadiga.number}, {item.sudQarori.davlatDaromadiga.sana})
                        </p>
                        <p><strong>Egasiga qaytarildi:</strong> {item.sudQarori.egasigaQaytarildi.soni} dona</p>
                        <p><strong>Yo‘q qilindi:</strong> {item.sudQarori.yoqQilindi.soni} dona</p>
                        <p><strong>Ijrochiga topshirildi:</strong> {item.sudQarori.ijrochigaTopshirildi.soni} dona</p>
                    </Block>

                    {/* Mablag‘ */}
                    <Block title="Tushgan mablag‘">
                        <p><strong>Hammasi:</strong> {item.tushganMablag.hammasi.toLocaleString()} so‘m</p>
                        <p><strong>Mahalliy budjetga:</strong> {item.tushganMablag.mahalliyBudjet.toLocaleString()} so‘m</p>
                    </Block>
                </div>

                {/* Footer */}
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
