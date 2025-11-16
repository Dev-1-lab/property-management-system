import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../features/auth/context/AuthContext';
import { ToastProvider } from '../components/ui/Toast';
import AppRoutes from './AppRoutes';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ToastProvider>
                    <AppRoutes />
                </ToastProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;