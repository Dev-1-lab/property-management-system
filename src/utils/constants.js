// API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
// API endpoints

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
    },
    ITEMS: {
        LIST: '/items',
        CREATE: '/items',
        UPDATE: (id) => `/items/${id}`,
        DELETE: (id) => `/items/${id}`,
        GET: (id) => `/items/${id}`,
    },
    USERS: {
        LIST: '/users',
        CREATE: '/users',
        UPDATE: (id) => `/users/${id}`,
        DELETE: (id) => `/users/${id}`,
    },
    NOTIFICATIONS: {
        LIST: '/notifications',
        MARK_READ: (id) => `/notifications/${id}/read`,
    },
};

// User roles
export const USER_ROLES = {
    TERGOVCHI: 'TERGOVCHI',
    TASDIQLOVCHI: 'TASDIQLOVCHI',
    MONITORING: 'MONITORING',
    ADMINISTRATOR: 'ADMINISTRATOR',
};

export const ROLE_LABELS = {
    [USER_ROLES.TERGOVCHI]: 'Tergovchi',
    [USER_ROLES.TASDIQLOVCHI]: 'Tasdiqlovchi',
    [USER_ROLES.MONITORING]: 'Monitoring',
    [USER_ROLES.ADMINISTRATOR]: 'Administrator',
};

// Item statuses - To'liq jarayon bo'yicha
export const ITEM_STATUS = {
    YARATILGAN: 'YARATILGAN',
    EKSPERTIZA_KIRITILGAN: 'EKSPERTIZA_KIRITILGAN',
    SAQLASHGA_YUBORILGAN: 'SAQLASHGA_YUBORILGAN',
    TASDIQLANGAN: 'TASDIQLANGAN',
    MATERIALNI_SUDGA_TOPSHIRILGAN: 'MATERIALNI_SUDGA_TOPSHIRILGAN',
    SUD_QARORI_KIRITILGAN: 'SUD_QARORI_KIRITILGAN',
    TUSHGAN_MABLAG: 'TUSHGAN_MABLAG',
};

export const STATUS_CONFIG = {
    [ITEM_STATUS.YARATILGAN]: {
        color: 'bg-gray-100 text-gray-800',
        label: 'Yaratilgan',
    },
    [ITEM_STATUS.EKSPERTIZA_KIRITILGAN]: {
        color: 'bg-purple-100 text-purple-800',
        label: 'Ekspertiza kiritilgan',
    },
    [ITEM_STATUS.SAQLASHGA_YUBORILGAN]: {
        color: 'bg-blue-100 text-blue-800',
        label: 'Saqlashga yuborilgan',
    },
    [ITEM_STATUS.TASDIQLANGAN]: {
        color: 'bg-green-100 text-green-800',
        label: 'Tasdiqlangan',
    },
    [ITEM_STATUS.MATERIALNI_SUDGA_TOPSHIRILGAN]: {
        color: 'bg-yellow-100 text-yellow-800',
        label: 'Sudga topshirilgan',
    },
    [ITEM_STATUS.SUD_QARORI_KIRITILGAN]: {
        color: 'bg-orange-100 text-orange-800',
        label: 'Sud qarori kiritilgan',
    },
    [ITEM_STATUS.TUSHGAN_MABLAG]: {
        color: 'bg-emerald-100 text-emerald-800',
        label: 'Tushgan mablag\' kiritilgan',
    },
};

// Item types
export const ITEM_TYPES = {
    TRANSPORT: 'TRANSPORT',
    ELEKTRONIKA: 'ELEKTRONIKA',
    QIMMATBAHO: 'QIMMATBAHO',
    BOSHQA: 'BOSHQA',
};

export const ITEM_TYPE_LABELS = {
    [ITEM_TYPES.TRANSPORT]: 'Transport',
    [ITEM_TYPES.ELEKTRONIKA]: 'Elektronika',
    [ITEM_TYPES.QIMMATBAHO]: 'Qimmatbaho buyumlar',
    [ITEM_TYPES.BOSHQA]: 'Boshqa',
};

// Storage locations
export const STORAGE_LOCATIONS = [
    { id: '1-ombor', name: '1-ombor' },
    { id: '2-ombor', name: '2-ombor' },
    { id: '3-ombor', name: '3-ombor' },
    { id: '4-ombor', name: '4-ombor' },
];

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// File upload
export const FILE_UPLOAD = {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
};