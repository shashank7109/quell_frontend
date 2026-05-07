# Quell Frontend

Next.js 16 dashboard for the Quell mutation testing platform. Includes a public landing page, authentication (email + Google OAuth), and a dashboard for API key management, usage analytics, and billing.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS** — dark theme, Vercel-inspired
- **Razorpay** — payment checkout (INR)
- **Google OAuth 2.0** — sign in with Google
- **next/font** — self-hosted Inter + JetBrains Mono

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, how it works, pricing |
| `/auth/sign-in` | Email + Google sign in |
| `/auth/sign-up` | Email + Google registration |
| `/auth/callback` | Google OAuth redirect handler |
| `/dashboard` | Usage overview + daily chart |
| `/dashboard/api-keys` | Create, list, and revoke API keys |
| `/dashboard/usage` | Monthly quota + request history |
| `/dashboard/billing` | Plan management + Razorpay checkout |

## Component library

```
components/
├── ui/
│   ├── Button.tsx    — variants: primary, blue, secondary, outline, ghost, destructive
│   ├── Card.tsx      — container with padding variants (none/sm/md/lg)
│   ├── Input.tsx     — labeled input with error + hint states
│   └── Badge.tsx     — tone-based status badge (default/success/warning/error/blue/purple)
├── AuthLayout.tsx    — centered auth page shell with top bar
├── GoogleButton.tsx  — Google OAuth button
└── Logo.tsx          — image logo with size and href props
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your values
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (e.g. `http://localhost:8000`) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID |

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.local.example` to `.env.local`. Never commit `.env.local` — it is gitignored.

The only variable exposed to the browser is prefixed `NEXT_PUBLIC_`. No secrets go to the client.

## Backend

This frontend expects the [Quell Backend](https://github.com/shashank7109/quell_backend) running at the URL set in `NEXT_PUBLIC_API_URL`.

## License

MIT
