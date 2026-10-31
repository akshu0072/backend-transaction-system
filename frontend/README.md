# Ledger — Transaction Frontend

A clean, minimal React + Vite frontend for the existing transaction backend.

## Installation

```bash
npm install
```

## Environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

`VITE_API_URL` is the base URL of the backend API. It is read at build time.

## Run the frontend

```bash
npm run dev
```

The app starts on Vite's default port (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

## Expected backend base URL

```
http://localhost:5000/api
```

All requests go through a single Axios instance configured with `withCredentials: true` so the backend's token cookie is sent and received correctly. A bearer token from the auth response is also stored locally and attached as the `Authorization` header.

## Backend endpoints used by each feature

| Feature                  | Method | Endpoint                          |
|--------------------------|--------|-----------------------------------|
| Register                 | POST   | `/api/auth/register`              |
| Login                    | POST   | `/api/auth/login`                 |
| Logout                   | POST   | `/api/auth/logout`                |
| Create account           | POST   | `/api/account`                    |
| List accounts            | GET    | `/api/account`                    |
| Get account balance      | GET    | `/api/account/:accountId/balance` |
| Create transaction       | POST   | `/api/transaction`                |
| Initial funds            | POST   | `/api/transaction/initial-funds`  |

## Notes/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        fintech: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          primary: '#2563EB',
          'primary-dark': '#1D4ED8',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          success: '#16A34A',
          error: '#DC2626',
          warning: '#D97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15,{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Path alias — depth-invariant imports for src (@/foo === src/foo from any file) */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
 23, 42, 0.06)',
        'card-hover': '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};


- A unique idempotency key is generated automatically for every transaction attempt (UUID via `crypto.randomUUID`). It is reused for the duration of a single request and regenerated only after the request settles, preventing accidental duplicate submissions.
- The transaction processing UI shows a clear "Processing Transaction" state and disables the submit button while the backend processes (~15s).
- All balances come from the backend. The frontend never computes authoritative balances or transaction validity.
