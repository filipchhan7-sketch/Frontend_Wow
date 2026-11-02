// Login helper.
// - If VITE_API_URL is set: POST {API}/auth/login  { email, password }  ->  { token, name }
// - If not set: demo mode with the fake account below (for development only).

const API = import.meta.env.VITE_API_URL;
const KEY = 'wp_auth';
const DEMO = { email: 'admin@wowpotato.com', password: 'admin123' };
export const DEMO_MODE = !API;
export const DEMO_HINT = `${DEMO.email} / ${DEMO.password}`;

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function login({ email, password, remember }) {
  let data;
  if (API) {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.status === 401 || res.status === 403) throw new Error('Wrong email or password.');
    if (!res.ok) throw new Error('Something went wrong on the server. Please try again.');
    data = await res.json();
  } else {
    await delay(800);
    if (email.toLowerCase() !== DEMO.email || password !== DEMO.password) throw new Error('Wrong email or password.');
    data = { token: 'demo-token', name: 'Admin (demo)' };
  }
  const store = remember ? localStorage : sessionStorage;
  store.setItem(KEY, JSON.stringify({ token: data.token, name: data.name, email }));
  return data;
}

export function getAuth() {
  try { return JSON.parse(localStorage.getItem(KEY) || sessionStorage.getItem(KEY) || 'null'); }
  catch { return null; }
}

export function logout() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
}