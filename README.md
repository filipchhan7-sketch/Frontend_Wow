# WOW POTATO — Frontend (React + Tailwind CSS + JavaScript)

Franchise-recruitment + brand + menu website. Vite, React 18, React Router, Tailwind CSS 3, Framer Motion.

## Run it
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the build
```

## Pages
`/` Home · `/story` · `/why-wow` · `/menu` (category filter + detail popup) · `/stores` (search + map) ·
`/franchise` · `/franchise/apply` (5-step form) · `/international` · `/events` (booking form) ·
`/news` (+ `/news/:slug`) · `/contact` · `/privacy` · `/terms`

## Where to edit things
| What | File |
|---|---|
| Copy, nav, steps, formats, stats, contact info | `src/data/content.js` |
| Menu items (add `image: '/images/x.jpg'` for photos) | `src/data/menu.js` |
| Stores (address, hours, phone) | `src/data/stores.js` |
| News articles | `src/data/news.js` |
| Brand colors / fonts / animations | `tailwind.config.js` |
| Fry box illustration (swap for a photo) | `src/components/FryBox.jsx` |

Put photos/logo in `public/` and reference them as `/name.jpg`.

## Waiting on management (placeholders already in place)
- `STATS` in `content.js`: items with `approved: false` show "XXX / pending approval". Set `approved: true` once management approves the numbers.
- Store sizes show `X m²` and investment shows "Contact us" (`FORMATS` in `content.js`).
- Menu, store addresses/hours, news and legal pages are SAMPLE content.

## Analytics (GA4)
1. Uncomment the gtag snippet in `index.html` and add your Measurement ID (or use GTM — events go to `dataLayer`).
2. Events fired (see `src/lib/analytics.js`): `franchise_cta_click {location}`, `application_started`,
   `application_step_completed {step, step_name}`, `application_submitted`, `event_booking_submitted`, `store_selected`.
3. Mark `application_submitted` as a conversion in GA4.

## Connecting the backend
By default forms use a mock API that saves to `localStorage` (key `wp_mock_WP` / `wp_mock_EV`).
Copy `.env.example` to `.env` and set `VITE_API_URL`. The frontend then POSTs JSON to:
- `POST {API}/franchise-leads` → returns `{ "id": "..." }`
- `POST {API}/event-bookings`  → returns `{ "id": "..." }`

Lead payload fields: fullName, company, position, email, phone, country, city, currentBusiness, fbExperience,
existingStores, yearsInBusiness, investment, territoryCountry, territoryCity, stores, message, consent.

## Deploy
Any static host (Netlify, Vercel, Cloudflare Pages). `public/_redirects` handles SPA routing on Netlify;
on Vercel add a rewrite of `/(.*)` to `/index.html`.
