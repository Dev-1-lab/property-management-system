import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 raqami */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Search className="w-6 h-6" />
                        <p className="text-2xl font-semibold">Sahifa topilmadi</p>
                    </div>
                </div>

                {/* Tavsif */}
                <div className="mb-8">
                    <p className="text-lg text-gray-600 mb-2">
                        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o'chirilgan.
                    </p>
                    <p className="text-gray-500">
                        URL manzilini tekshiring yoki bosh sahifaga qayting.
                    </p>
                </div>

                {/* Illustratsiya */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="w-64 h-64 bg-indigo-100 rounded-full flex items-center justify-center">
                            <div className="w-48 h-48 bg-indigo-200 rounded-full flex items-center justify-center">
                                <div className="w-32 h-32 bg-indigo-300 rounded-full flex items-center justify-center">
                                    <Search className="w-16 h-16 text-indigo-600" />
                                </div>
                            </div>
                        </div>
                        {/* Floating dots */}
                        <div className="absolute top-0 left-0 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="absolute top-10 right-0 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="absolute bottom-10 left-10 w-5 h-5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>

                {/* Tugmalar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Orqaga qaytish
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                        <Home className="w-5 h-5" />
                        Bosh sahifa
                    </button>
                </div>


            </div>
        </div>
    );
};

export default NotFoundPage;