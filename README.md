# JoyStore — PlayStation store as a Telegram Mini App

[![deploy](https://github.com/igstX4/joy_client/actions/workflows/joystore_fe_deploy.yml/badge.svg)](https://github.com/igstX4/joy_client/actions/workflows/joystore_fe_deploy.yml)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Telegram Mini App](https://img.shields.io/badge/Telegram-Mini_App-26A5E4?logo=telegram&logoColor=white)

A storefront for PlayStation games, subscriptions and in-game currency that runs
**inside Telegram** as a Mini App: the Telegram WebApp SDK provides the user
identity, so there is no password screen — the app recognises who opened it and
creates the account on first launch.

## Storefront

| Route | Page |
|-------|------|
| `/region` | Region picker — stored in a cookie, required before anything else |
| `/` | Home: banners, categories and curated product rails |
| `/catalog/:type` | Catalogue by section |
| `/game/:productId` | Game page (editions, DLC, screenshots) |
| `/donate` · `/donate/:id` | Donation / currency packs |
| `/cart` | Cart |
| `/favourite` | Wishlist |
| `/deposit` | Balance top-up |
| `/profile` | Account |
| `/history` | Purchase history |

## Admin panel (`/panel`)

News · Prices · Add admins · Loyalty programme · Transaction history ·
Blacklist · Games in sections · Donate — each section in its own page with
modals for editing (`GameModal`, `NewsModal`, `ActionModal`, `EditModal`).

## The interesting part: Telegram-first auth

`TelegramInitializer` is mounted once inside the router and takes care of the
whole session:

1. `useTelegram()` waits for the injected `telegram-web-app.js` to expose
   `window.Telegram.WebApp` — it retries five times, 500 ms apart, because the
   script can lose the race with React on a cold start.
2. It calls `tg.ready()`, reads `initDataUnsafe.user` and mirrors the Telegram
   colour scheme onto `<html data-theme="dark|light">`, so the app theme follows
   the client's Telegram theme (`initTheme` / `setTheme` / `toggleTheme`).
3. If there is no `tgId` in `localStorage` the user is registered
   (`addTelegramUser`); otherwise their profile is fetched (`getCurrentUser`),
   and a missing profile falls back to registration.
4. `routes.tsx` gates the app: without a session and without a `region` cookie
   (`TRY` / `UAH`) every path redirects to `/region`.

The same hook reports diagnostics back to a Telegram chat, which is how the
launch sequence was debugged on real devices — see the security note below
about where that logging lives.

## Page transitions

Routes are wrapped in `framer-motion`'s `AnimatePresence` with `mode="wait"`, and
every page is rendered inside a shared `PageTransition`, so navigation fades
rather than flashes. A single transition component keeps the animation identical
across ~20 routes.

## Project structure

```
src/
├── app/routes.tsx       all routes (storefront, admin, auth screens)
├── components/
│   ├── layouts/         GlobalLayout (storefront) — header, nav, footer
│   ├── modals/          AttentionModal and friends
│   ├── shared/          the design system: Catalog rails, CategoryItem,
│   │                    CustomSelect, DiscountTag, DonateItem, PlatformChoose…
│   ├── svgs/            inline icon sets (storefront + admin)
│   └── TelegramInitializer.tsx
├── hooks/useTelegram.ts WebApp bootstrap, theme helpers, bot logging
├── http/axios.ts        axios instance + interceptors
├── pages/               one folder per route, incl. pages/admin/*
├── store/
│   ├── store.ts  hooks.ts
│   └── slices/          user, catalog, product
├── styles/              theme.scss, icons.scss
├── types/               product, user, telegram typings
└── main.tsx             initTheme() → Redux Provider → router
```

## Tech stack

React 18 · TypeScript 5.6 · Vite 6 · Redux Toolkit · React Router 7 · axios ·
js-cookie · lodash · framer-motion · react-slick · SCSS modules ·
Telegram WebApp SDK · SF Pro Display webfont.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in ./dist
npm run lint
```

The app expects to be opened *inside* Telegram, which needs an HTTPS origin.
`vite.config.ts` therefore allows ngrok tunnels and adds the
`ngrok-skip-browser-warning` header:

```ts
server: {
  allowedHosts: ['.ngrok-free.app'],
  headers: { 'ngrok-skip-browser-warning': 'true' },
}
```

Point the bot's Mini App URL at the ngrok host to test on a phone. Outside
Telegram there is no `window.Telegram`, so the initialiser gives up after its
retries and the UI renders with the saved or system theme.

The API base URL is set in `src/http/axios.ts` (`https://dsfqq.ru/api/`); the
file also keeps commented local and staging hosts for switching during
development.

## Deployment

`.github/workflows/joystore_fe_deploy.yml` runs on every push to `main`:

1. installs the SSH key from repository secrets (`SSH_KEY`, `SSH_HOST`,
   `SSH_PORT`, `SSH_USER`) and scans the host key,
2. `scp`s the repository to `~/client` on the server,
3. runs `docker compose build && docker compose up -d` there and removes the
   copied sources.

So the build happens on the host, and the Dockerfile / compose file are expected
to be provisioned there rather than in this repository.

## Security notes — read before reusing this code

- **`src/hooks/useTelegram.ts` contains a hard-coded Telegram bot token and
  chat id** and posts log messages straight to the Bot API from the browser.
  Anything shipped to a client is public, so this token must be treated as
  compromised: revoke it in `@BotFather` and move the reporting behind your own
  API (or delete it) before the app goes anywhere near production. It is present
  in the repository's single commit, so rewriting history and rotating the token
  both have to happen — rotating is the part that actually protects the bot.
- The workflow's key-setup step runs `env`, which prints the job environment —
  including the secrets from that step — into the build log. Drop that line and
  the token is never echoed.
- `initData` is read from `window.Telegram.WebApp.initDataUnsafe`; the backend
  should verify `initData` server-side (HMAC with the bot token) before trusting
  the user id. The client-side value alone is not proof of identity.

## Other things worth tidying

- `src/routes/Home.tsx` and `src/routes/Contacts.tsx` are leftovers from the Vite
  template and are no longer imported.
- `app/routes.tsx` exports both an animated `RoutesApp` (used by `main.tsx`) and
  a second `createBrowserRouter` definition that nothing mounts — one of the two
  should go, along with the duplicate `react-router` / `react-router-dom`
  dependency.
