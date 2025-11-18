<img width="1392" height="633" alt="messenger" src="https://github.com/user-attachments/assets/0c41b179-ab0d-460e-bbe6-a691454242c9" />

# Real‑Time Dating App

A production‑ready, Messenger‑style chat built with Next.js 15. It delivers real‑time messaging, presence, notifications, protected routing, and modern UX. The frontend consumes a REST API and connects to a Socket.IO server for live updates.

## Features

- Authentication: sign up, sign in, logout, OTP verification, password reset
- Protected routes with cookie‑based sessions and middleware
- Real‑time one‑to‑one chat using Socket.IO
- Presence: online users, typing indicators
- Notifications: unread badge, mark single/all as read
- Friends: discovery, requests (send/accept/reject/cancel), lists and filters
- Message history loading, emoji support, debounced inputs
- Responsive, accessible UI with Tailwind CSS

## Tech Stack

- Framework: `Next.js 15` (App Router, Turbopack)
- UI: `React 19`, `Tailwind CSS 4`
- Real‑time: `socket.io-client`
- State: `Redux Toolkit`, `RTK Query`, `redux-persist`
- Forms & Validation: `react-hook-form`, `Formik`, `Yup`, `Zod`, `emoji-mart`
- HTTP: `Axios` with interceptors and refresh logic
- Tooling: `TypeScript 5`, `ESLint 9`

Path alias: `@/*` → `src/*` (see `tsconfig.json`).

## Prerequisites

- Node.js 18+
- A package manager: `pnpm` (recommended) or `npm`
- Running backend REST API and Socket.IO server

## Quick Start

1) Install dependencies

```bash
pnpm install
# or
npm install
```

2) Configure environment

Create `.env.local` in the project root:

```bash
# Backend REST API base URL (e.g., http://localhost:4000)
NEXT_PUBLIC_BACKEND_URL=

# Socket.IO server URL (e.g., ws://localhost:4000)
NEXT_PUBLIC_SOCKET_URL=
```

3) Run the app

```bash
pnpm dev
# http://localhost:3000
```

Ensure your backend is reachable via `NEXT_PUBLIC_BACKEND_URL` and your Socket.IO server via `NEXT_PUBLIC_SOCKET_URL`.

## Scripts

- `pnpm dev` → start development server (Turbopack)
- `pnpm build` → production build
- `pnpm start` → start production server
- `pnpm lint` → run ESLint with Next.js config

## Project Structure

```
src/
  app/
    (router)/auth/...           # Auth pages (signin, signup, reset, verify OTP)
    components/ui/...           # Chat UI: header, sidebar, message and input areas
    hooks/...                   # Chat/notification sockets, typing indicator, filters
    lib/axios.ts                # Axios with interceptors
    providers/Providers.tsx     # App providers (Redux, etc.)
    redux/...                   # RTK Query APIs and slices
    socket-io/socket-io.ts      # Socket client connect/get/disconnect
    shared/...                  # Reusable UI elements and utilities
    layout.tsx, page.tsx        # App layout and root page
  middleware.ts                 # Route protection
```

## Authentication

- Middleware enforces protected routes via cookie tokens (`src/middleware.ts:1`).
- Auth API and automatic refresh handled via RTK Query base query (`src/app/redux/base-query/baseQueryWithReauth.ts`).
- Forms use `react-hook-form` or `Formik` with `Zod`/`Yup` schemas (`src/app/lib/schemas/authSchemas.ts`).

## Real‑Time & Sockets

- Socket client lives in `src/app/socket-io/socket-io.ts:1` with `connectSocket`, `getSocket`, `disconnectSocket`.
- Notifications hook emits `read_all_notifications` and handles unread count (`src/app/hooks/useNotificationSocket.ts:61`).
- Additional hooks: `useChatSocket.ts`, `useTypingIndicator.ts` for messaging and presence.

## State Management

- Central store configured under `src/app/redux/store.ts`.
- Features include auth API, friend APIs/slices, and message/user slices.
- Persisted state via `redux-persist` where appropriate.

## Build & Deploy

```bash
pnpm build
pnpm start
```

Deploy behind HTTPS and ensure cookies are scoped correctly for your domain.

## Troubleshooting

- Blank screen: confirm `.env.local` values and that backend/socket servers are running.
- Socket not connecting: verify `NEXT_PUBLIC_SOCKET_URL` and network access; check `transports: ["websocket"]` in the client (`src/app/socket-io/socket-io.ts`).
- Redirect loops: inspect cookies (`accessToken`) and middleware matcher (`src/middleware.ts`).
- Type or lint issues: run `pnpm lint` and review ESLint output.

## License

MIT (or as defined by the repository owner).
