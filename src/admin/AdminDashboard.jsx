import { useEffect, useRef, useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';
import { ADMIN_NAV } from './data';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';

export default function AdminDashboard() {
  const [page, setPage] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const title = ADMIN_NAV.find((item) => item.id === page)?.label ?? 'Dashboard';

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2600);
  };

  const navigate = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
  };

  return <div className="flex min-h-screen bg-brand-cream font-sans text-brand-choc antialiased">
    <AdminSidebar page={page} onNavigate={navigate} open={menuOpen} onClose={() => setMenuOpen(false)} />
    <div className="flex min-h-screen min-w-0 flex-1 flex-col">
      <AdminTopbar title={title} onOpenMenu={() => setMenuOpen(true)} onNotify={() => showToast('You have 3 new notifications')} />
      <main className="mx-auto w-full max-w-[1600px] flex-1 p-4 sm:p-6 lg:p-8">
        {page === 'dashboard' && <DashboardPage />}
        {page === 'users' && <UsersPage showToast={showToast} />}
        {page === 'orders' && <OrdersPage />}
        {page === 'settings' && <SettingsPage showToast={showToast} />}
      </main>
      <footer className="px-4 pb-5 text-center text-[11px] text-brand-choc/40 sm:px-6 lg:px-8">WOW POTATO Admin · UI preview</footer>
    </div>
    <div aria-live="polite" role="status" className={`fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl border-l-4 border-brand-yellow bg-brand-choc px-5 py-3 text-center text-sm font-medium text-brand-tile shadow-xl transition-all sm:left-auto sm:right-6 sm:translate-x-0 ${toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>{toast}</div>
  </div>;
}
