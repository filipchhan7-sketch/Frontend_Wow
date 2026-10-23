// Mock-first API layer. With VITE_API_URL empty, submissions are saved to localStorage.
// Set VITE_API_URL to your backend and these POST to:
//   POST {API}/franchise-leads   -> { id }
//   POST {API}/event-bookings    -> { id }
const API = import.meta.env.VITE_API_URL;
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function post(path, payload, prefix) {
  if (API) {
    const res = await fetch(`${API}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  }
  await delay(900);
  const id = `${prefix}-${Date.now().toString(36).toUpperCase()}`;
  const key = `wp_mock_${prefix}`;
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  list.push({ id, ...payload, status: 'New', createdAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(list));
  return { id };
}

export const submitLead = (payload) => post('/franchise-leads', payload, 'WP');
export const submitEventBooking = (payload) => post('/event-bookings', payload, 'EV');
