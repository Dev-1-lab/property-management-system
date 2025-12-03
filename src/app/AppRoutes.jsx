import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {useAuth} from '../features/auth/context/AuthContext';
import LoginPage from '../features/auth/pages/LoginPage';
import MainLayout from '../components/layout/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import ItemsPage from '../features/items/pages/ItemsPage';
import ExpertisePage from '../features/expertise/pages/ExpertisePage';
import StoragePage from '../features/storage/pages/StoragePage';
import DecisionPage from '../features/decision/pages/DecisionPage';
import RevenuePage from '../features/revenue/pages/RevenuePage';
import ReportsPage from '../pages/ReportsPage';
import AdminPage from '../features/admin/pages/AdminPage';
import {USER_ROLES} from '../utils/constants';
import MaterialSubmissionPage from "../features/material/pages/MaterialSubmissionPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import ItemDetailPage from "../features/items/pages/ItemDetailsPage.jsx";

// Protected Route wrapper
const ProtectedRoute = ({children, allowedRoles}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace/>;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage/>}/>

            {/* Protected Routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout/>
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/dashboard" replace/>}/>

                <Route path="dashboard" element={<DashboardPage/>}/>

                <Route path="items" element={<ItemsPage/>}/>

                <Route
                    path="expertise"
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR]}>
                            <ExpertisePage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="storage"
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.TASDIQLOVCHI, USER_ROLES.ADMINISTRATOR]}>
                            <StoragePage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="decision"
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR]}>
                            <DecisionPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="items/:id"
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR]}>
                            <ItemDetailPage/>
                        </ProtectedRoute>
                    }/>
                <Route
                    path="revenue"
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.TERGOVCHI, USER_ROLES.ADMINISTRATOR]}>
                            <RevenuePage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="reports"
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.MONITORING, USER_ROLES.ADMINISTRATOR]}>
                            <ReportsPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="material"
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.ADMINISTRATOR, USER_ROLES.TERGOVCHI]}>
                            <MaterialSubmissionPage/>
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="users"
                    element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.ADMINISTRATOR]}>
                            <AdminPage/>
                        </ProtectedRoute>
                    }
                />


            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default AppRoutes;