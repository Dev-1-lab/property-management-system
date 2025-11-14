# Mol-mulk boshqaruv tizimi - Frontend

Tergov jarayonida ishtirok etuvchi barcha bo'limlar tomonidan yuritiladigan mol-mulkka oid jarayonlarni raqamlashtirish va avtomatlashtirish tizimi.

## Texnologiyalar

- **React 18** - UI library
- **React Router v6** - Routing
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **Vite** - Build tool
- **Lucide React** - Icons

## Loyiha strukturasi

```
src/
├── app/                    # Application entry point
│   ├── App.jsx
│   └── AppRoutes.jsx
├── features/               # Feature modules
│   ├── auth/              # Authentication
│   ├── items/             # Mol-mulk management
│   ├── storage/           # Storage confirmation
│   ├── expertise/         # Expertise
│   ├── decision/          # Court decisions
│   ├── notifications/     # Notifications
│   └── admin/             # User management
├── components/            # Shared components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── shared/           # Common components
├── pages/                # Page components
├── utils/                # Utilities
│   ├── api.js           # API client
│   ├── constants.js     # Constants
│   ├── helpers.js       # Helper functions
│   └── validators.js    # Validation functions
└── styles/              # Global styles
```

## O'rnatish

1. Dependencies o'rnatish:
```bash
npm install
```

2. Environment variables sozlash:
```bash
cp .env.example .env
```

3. `.env` faylini tahrirlang:
```
REACT_APP_API_URL=http://localhost:8080/api
```

## Ishga tushirish

Development rejimda:
```bash
npm run dev
```

Production build:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Rollar va ruxsatlar

### TERGOVCHI
- Mol-mulk qo'shish va tahrirlash
- Ekspertiza yuborish
- Baholash
- Sud qarorini kiritish

### TASDIQLOVCHI
- Mol-mulkni saqlash joyiga kelganini tasdiqlash
- Hujjat yuklash

### MONITORING
- Barcha jarayonlarni ko'rish
- Hisobotlar ko'rish
- O'zgartirish huquqi yo'q

### ADMINISTRATOR
- Barcha funksiyalar
- Foydalanuvchilarni boshqarish
- Tizim sozlamalari

## API integratsiya

API endpointlar `src/utils/api.js` faylida belgilangan:

```javascript
// Misol: Mol-mulklar ro'yxatini olish
import { itemsAPI } from './utils/api';

const items = await itemsAPI.getAll({
  page: 1,
  limit: 20,
  status: 'TASDIQLANGAN'
});
```

## Statuslar

- `YARATILGAN` - Yangi yaratilgan
- `SAQLASHGA_YUBORILGAN` - Saqlashga yuborilgan
- `TASDIQLANGAN` - Tasdiqlangan
- `EKSPERTIZAGA_YUBORILGAN` - Ekspertizaga yuborilgan
- `BAHOLANGAN` - Baholangan
- `SUD_QARORI` - Sud qarori kiritilgan

## Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod
```

### Docker
```bash
docker build -t property-management-frontend .
docker run -p 3000:3000 property-management-frontend
```

## Qo'llab-quvvatlash

Muammolar yuzaga kelganda GitHub Issues bo'limida xabar bering.

## License

MIT