// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { authAPI } from '../../../utils/api';
//
// const AuthContext = createContext(null);
//
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     // Check if user is logged in on mount
//     useEffect(() => {
//         const initAuth = async () => {
//             const token = localStorage.getItem('accessToken');
//             if (token) {
//                 try {
//                     const response = await authAPI.getCurrentUser();
//                     setUser(response.data);
//                 } catch (err) {
//                     console.error('Failed to get current user:', err);
//                     localStorage.removeItem('accessToken');
//                     localStorage.removeItem('refreshToken');
//                 }
//             }
//             setLoading(false);
//         };
//
//         initAuth();
//     }, []);
//
//     const login = async (credentials) => {
//         try {
//             setError(null);
//             const response = await authAPI.login(credentials);
//             const { accessToken, refreshToken, user: userData } = response.data;
//
//             localStorage.setItem('accessToken', accessToken);
//             localStorage.setItem('refreshToken', refreshToken);
//             setUser(userData);
//
//             return { success: true };
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || 'Login muvaffaqiyatsiz';
//             setError(errorMessage);
//             return { success: false, error: errorMessage };
//         }
//     };
//
//     const logout = async () => {
//         try {
//             await authAPI.logout();
//         } catch (err) {
//             console.error('Logout error:', err);
//         } finally {
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             setUser(null);
//         }
//     };
//
//     const hasRole = (roles) => {
//         if (!user) return false;
//         if (Array.isArray(roles)) {
//             return roles.includes(user.role);
//         }
//         return user.role === roles;
//     };
//
//     const hasPermission = (permission) => {
//         if (!user) return false;
//         return user.permissions?.includes(permission) || false;
//     };
//
//     const value = {
//         user,
//         loading,
//         error,
//         login,
//         logout,
//         hasRole,
//         hasPermission,
//         isAuthenticated: !!user,
//     };
//
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
//
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };
//
// export default AuthContext;









import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

// Mock users data (same as in your login component)
const MOCK_USERS = [
    {
        id: 1,
        email: 'tergovchi@tizim.uz',
        password: '12345678',
        role: 'TERGOVCHI',
        name: 'A. Karimov',
        permissions: ['view_cases', 'edit_cases', 'create_reports']
    },
    {
        id: 2,
        email: 'tasdiqlovchi@tizim.uz',
        password: '12345678',
        role: 'TASDIQLOVCHI',
        name: 'S. Toshmatov',
        permissions: ['view_cases', 'approve_cases', 'view_reports']
    },
    {
        id: 3,
        email: 'monitoring@tizim.uz',
        password: '12345678',
        role: 'MONITORING',
        name: 'N. Umarova',
        permissions: ['view_all_cases', 'generate_reports', 'export_data']
    },
    {
        id: 4,
        email: 'admin@tizim.uz',
        password: 'admin123',
        role: 'ADMINISTRATOR',
        name: 'B. Rahimov',
        permissions: ['full_access', 'manage_users', 'system_settings']
    },
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount (using mock data)
    useEffect(() => {
        const initAuth = () => {
            const userData = localStorage.getItem('mockUser');
            if (userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    // Remove password from stored user data for security
                    const { password, ...userWithoutPassword } = parsedUser;
                    setUser(userWithoutPassword);
                } catch (err) {
                    console.error('Failed to parse stored user data:', err);
                    localStorage.removeItem('mockUser');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials) => {
        try {
            setError(null);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Find user in mock data
            const foundUser = MOCK_USERS.find(
                u => u.email === credentials.email && u.password === credentials.password
            );

            if (!foundUser) {
                throw new Error('Email yoki parol noto\'g\'ri');
            }

            // Remove password from user object before storing
            const { password, ...userWithoutPassword } = foundUser;

            // Store user data in localStorage (instead of tokens)
            localStorage.setItem('mockUser', JSON.stringify(userWithoutPassword));
            localStorage.setItem('mockLoginTime', new Date().toISOString());

            setUser(userWithoutPassword);

            return { success: true };
        } catch (err) {
            const errorMessage = err.message || 'Login muvaffaqiyatsiz';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 200));
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('mockUser');
            localStorage.removeItem('mockLoginTime');
            setUser(null);
        }
    };

    const hasRole = (roles) => {
        if (!user) return false;
        if (Array.isArray(roles)) {
            return roles.includes(user.role);
        }
        return user.role === roles;
    };

    const hasPermission = (permission) => {
        if (!user) return false;
        return user.permissions?.includes(permission) || false;
    };

    // Helper function to get mock token (for components that might expect it)
    const getMockToken = () => {
        if (!user) return null;
        return `mock_token_${user.id}_${Date.now()}`;
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        hasRole,
        hasPermission,
        isAuthenticated: !!user,
        getMockToken, // In case you need a token-like string somewhere
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;