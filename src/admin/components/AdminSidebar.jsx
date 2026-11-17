import AdminIcon from './AdminIcon';
import { ADMIN_NAV } from '../data';
import { Link } from 'react-router-dom';

export default function AdminSidebar({ page, onNavigate, open, onClose }) {
  return <>
    <button type="button" aria-label="Close navigation" aria-hidden={!open} disabled={!open} tabIndex={open ? 0 : -1} className={`fixed inset-0 z-40 bg-brand-choc/45 transition-opacity lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`} onClick={onClose} />
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col bg-brand-choc px-4 py-5 text-brand-tile transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-2 pb-8">
        <Link to="/home" className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-yellow font-display text-xl font-bold text-brand-choc">W</span>
          <span className="font-display text-xl font-semibold tracking-tight">WOW <span className="text-brand-yellow">POTATO</span></span>
        </Link>
        <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-brand-tile/70 hover:bg-white/10 lg:hidden" aria-label="Close navigation"><AdminIcon name="close" /></button>
      </div>
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-tile/40">Workspace</p>
      <nav aria-label="Admin navigation" className="space-y-1">
        {ADMIN_NAV.map((item) => <button key={item.id} type="button" onClick={() => onNavigate(item.id)} aria-current={page === item.id ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${page === item.id ? 'bg-brand-yellow text-brand-choc' : 'text-brand-tile/75 hover:bg-white/10 hover:text-white'}`}>
          <AdminIcon name={item.icon} className="h-[18px] w-[18px]" />{item.label}
        </button>)}
      </nav>
      <div className="mt-auto border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-potato font-display text-xs font-bold text-brand-choc">LY</span>
          <span className="min-w-0"><strong className="block truncate text-sm">LipY2K</strong><span className="block text-xs text-brand-tile/55">Administrator</span></span>
          <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" title="Online" />
        </div>
      </div>
    </aside>
  </>;
}
