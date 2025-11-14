import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock foydalanuvchilar
const MOCK_USERS = [
    { email: 'tergovchi@tizim.uz', password: '12345678', role: 'TERGOVCHI', name: 'A. Karimov' },
    { email: 'tasdiqlovchi@tizim.uz', password: '12345678', role: 'TASDIQLOVCHI', name: 'S. Toshmatov' },
    { email: 'monitoring@tizim.uz', password: '12345678', role: 'MONITORING', name: 'N. Umarova' },
    { email: 'admin@tizim.uz', password: 'admin123', role: 'ADMINISTRATOR', name: 'B. Rahimov' },
];

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Mock login validation
        const user = MOCK_USERS.find(
            u => u.email === email && u.password === password
        );

        if (user) {
            // Login successful
            await login({
                email: user.email,
                password: user.password
            });
            navigate('/dashboard');
        } else {
            setError('Email yoki parol noto\'g\'ri');
        }

        setIsLoading(false);
    };

    const handleQuickLogin = (userEmail) => {
        const user = MOCK_USERS.find(u => u.email === userEmail);
        if (user) {
            setEmail(user.email);
            setPassword(user.password);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '32px',
            width: '100%',
            maxWidth: '400px',
        },
        header: {
            textAlign: 'center',
            marginBottom: '32px',
        },
        iconWrapper: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            backgroundColor: '#EEF2FF',
            borderRadius: '50%',
            marginBottom: '16px',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '8px',
        },
        subtitle: {
            color: '#6B7280',
            marginTop: '8px',
        },
        errorBox: {
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
        },
        errorText: {
            fontSize: '14px',
            color: '#991B1B',
        },
        formGroup: {
            marginBottom: '16px',
        },
        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px',
        },
        input: {
            width: '100%',
            padding: '10px 16px',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.2s',
        },
        inputFocus: {
            borderColor: '#6366F1',
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
        },
        button: {
            width: '100%',
            backgroundColor: '#6366F1',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            fontSize: '14px',
        },
        buttonHover: {
            backgroundColor: '#4F46E5',
        },
        buttonDisabled: {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
        quickLogin: {
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #E5E7EB',
        },
        quickLoginTitle: {
            fontSize: '12px',
            color: '#6B7280',
            marginBottom: '12px',
            textAlign: 'center',
        },
        quickLoginButtons: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
        },
        quickLoginButton: {
            padding: '8px 12px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.2s',
            textAlign: 'center',
        },
        quickLoginButtonHover: {
            backgroundColor: '#F9FAFB',
            borderColor: '#6366F1',
        },
        footer: {
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#6B7280',
        },
        link: {
            color: '#6366F1',
            fontWeight: '500',
            textDecoration: 'none',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.iconWrapper}>
                        <Shield size={32} color="#6366F1" />
                    </div>
                    <h1 style={styles.title}>Mol-mulk xarakatini hisobga olish tizimi</h1>
                    <p style={styles.subtitle}>Tizimga kirish</p>
                </div>

                {error && (
                    <div style={styles.errorBox}>
                        <AlertCircle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <p style={styles.errorText}>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder="email@tizim.uz"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Parol</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            ...styles.button,
                            ...(isLoading ? styles.buttonDisabled : {}),
                        }}
                        disabled={isLoading}
                        onMouseEnter={(e) => {
                            if (!isLoading) e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                        }}
                        onMouseLeave={(e) => {
                            if (!isLoading) e.target.style.backgroundColor = styles.button.backgroundColor;
                        }}
                    >
                        {isLoading ? 'Yuklanmoqda...' : 'Kirish'}
                    </button>
                </form>

                {/* Quick Login Demo Users */}
                <div style={styles.quickLogin}>
                    <p style={styles.quickLoginTitle}>🔐 Demo foydalanuvchilar (Tez kirish)</p>
                    <div style={styles.quickLoginButtons}>
                        <button
                            onClick={() => handleQuickLogin('tergovchi@tizim.uz')}
                            style={styles.quickLoginButton}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = styles.quickLoginButtonHover.backgroundColor;
                                e.target.style.borderColor = styles.quickLoginButtonHover.borderColor;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.borderColor = '#D1D5DB';
                            }}
                        >
                            Tergovchi
                        </button>
                        <button
                            onClick={() => handleQuickLogin('tasdiqlovchi@tizim.uz')}
                            style={styles.quickLoginButton}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = styles.quickLoginButtonHover.backgroundColor;
                                e.target.style.borderColor = styles.quickLoginButtonHover.borderColor;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.borderColor = '#D1D5DB';
                            }}
                        >
                            Tasdiqlovchi
                        </button>
                        <button
                            onClick={() => handleQuickLogin('monitoring@tizim.uz')}
                            style={styles.quickLoginButton}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = styles.quickLoginButtonHover.backgroundColor;
                                e.target.style.borderColor = styles.quickLoginButtonHover.borderColor;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.borderColor = '#D1D5DB';
                            }}
                        >
                            Monitoring
                        </button>
                        <button
                            onClick={() => handleQuickLogin('admin@tizim.uz')}
                            style={styles.quickLoginButton}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = styles.quickLoginButtonHover.backgroundColor;
                                e.target.style.borderColor = styles.quickLoginButtonHover.borderColor;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.borderColor = '#D1D5DB';
                            }}
                        >
                            Admin
                        </button>
                    </div>
                </div>

                <div style={styles.footer}>
                    <p>
                        Muammo bormi?{' '}
                        <a href="#" style={styles.link}>
                            Administrator bilan bog'laning
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;