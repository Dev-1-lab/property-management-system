import React, { useState, useEffect, createContext, useContext } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, duration }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const showSuccess = (message, duration) => addToast(message, 'success', duration);
    const showError = (message, duration) => addToast(message, 'error', duration);
    const showWarning = (message, duration) => addToast(message, 'warning', duration);
    const showInfo = (message, duration) => addToast(message, 'info', duration);

    return (
        <ToastContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, removeToast }) => {
    const styles = {
        container: {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '400px',
        },
    };

    return (
        <div style={styles.container}>
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};

const Toast = ({ toast, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    const getToastConfig = () => {
        switch (toast.type) {
            case 'success':
                return {
                    icon: CheckCircle,
                    bgColor: '#ECFDF5',
                    borderColor: '#10B981',
                    iconColor: '#10B981',
                    textColor: '#065F46',
                };
            case 'error':
                return {
                    icon: XCircle,
                    bgColor: '#FEF2F2',
                    borderColor: '#EF4444',
                    iconColor: '#EF4444',
                    textColor: '#991B1B',
                };
            case 'warning':
                return {
                    icon: AlertCircle,
                    bgColor: '#FFFBEB',
                    borderColor: '#F59E0B',
                    iconColor: '#F59E0B',
                    textColor: '#92400E',
                };
            case 'info':
            default:
                return {
                    icon: Info,
                    bgColor: '#EFF6FF',
                    borderColor: '#3B82F6',
                    iconColor: '#3B82F6',
                    textColor: '#1E40AF',
                };
        }
    };

    const config = getToastConfig();
    const Icon = config.icon;

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const styles = {
        toast: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '16px',
            backgroundColor: config.bgColor,
            border: `1px solid ${config.borderColor}`,
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            animation: isExiting ? 'slideOut 0.3s ease-out' : 'slideIn 0.3s ease-out',
            minWidth: '300px',
        },
        iconWrapper: {
            flexShrink: 0,
        },
        content: {
            flex: 1,
            fontSize: '14px',
            color: config.textColor,
            fontWeight: '500',
            lineHeight: '1.5',
        },
        closeButton: {
            flexShrink: 0,
            padding: '2px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
        },
    };

    return (
        <>
            <div style={styles.toast}>
                <div style={styles.iconWrapper}>
                    <Icon size={20} color={config.iconColor} />
                </div>
                <div style={styles.content}>{toast.message}</div>
                <button
                    onClick={handleClose}
                    style={styles.closeButton}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                >
                    <X size={16} color={config.textColor} />
                </button>
            </div>

            <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `}</style>
        </>
    );
};

export default Toast;