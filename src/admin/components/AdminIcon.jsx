const paths = {
  dashboard: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  users: <><path d="M16 20v-1.7a4.3 4.3 0 0 0-4.3-4.3H7.3A4.3 4.3 0 0 0 3 18.3V20" /><circle cx="9.5" cy="7" r="4" /><path d="M21 20v-1.7a4.3 4.3 0 0 0-3.2-4.2M16.5 3.2a4 4 0 0 1 0 7.6" /></>,
  orders: <><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.1.9-1.1 1.9-1.4-.5a8 8 0 0 1-1.5.9l-.2 1.5h-2.2l-.3-1.5a8 8 0 0 1-1.6-.9l-1.4.5-1.1-1.9 1.2-.9a7 7 0 0 1 0-1.8l-1.2-.9 1.1-1.9 1.4.5a8 8 0 0 1 1.6-.9l.3-1.5h2.2l.2 1.5a8 8 0 0 1 1.5.9l1.4-.5 1.1 1.9-1.1.9a7 7 0 0 1-.1 1.8Z" transform="translate(-1 -1)" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  trend: <><path d="m4 16 6-6 4 4 6-7" /><path d="M14 7h6v6" /></>,
};

export default function AdminIcon({ name, className = 'h-5 w-5' }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
