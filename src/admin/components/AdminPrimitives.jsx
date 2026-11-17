import { initials } from '../data';

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-800 ring-emerald-700/15',
  Paid: 'bg-emerald-50 text-emerald-800 ring-emerald-700/15',
  Pending: 'bg-amber-50 text-amber-900 ring-amber-700/15',
  Suspended: 'bg-rose-50 text-rose-800 ring-rose-700/15',
  Refunded: 'bg-rose-50 text-rose-800 ring-rose-700/15',
};

export function PageHeading({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><h2 className="text-2xl font-bold tracking-tight text-brand-choc sm:text-3xl">{title}</h2><p className="mt-1 text-sm text-brand-choc/65">{subtitle}</p></div>
      {action}
    </div>
  );
}

export function Panel({ children, className = '' }) {
  return <section className={`rounded-2xl border border-brand-choc/10 bg-white p-5 shadow-[0_8px_28px_-24px_rgba(37,17,5,0.45)] sm:p-6 ${className}`}>{children}</section>;
}

export function PanelHeading({ title, subtitle }) {
  return <div className="mb-5"><h3 className="font-display text-lg font-semibold text-brand-choc">{title}</h3>{subtitle && <p className="mt-1 text-xs text-brand-choc/60">{subtitle}</p>}</div>;
}

export function StatusBadge({ status }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status] || 'bg-brand-potato/25 text-brand-choc ring-brand-choc/10'}`}>{status}</span>;
}

export function UserAvatar({ name, className = '' }) {
  return <span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-yellow/35 font-display text-xs font-bold text-brand-choc ${className}`}>{initials(name)}</span>;
}

export function DataTable({ columns, children, minWidth = 'min-w-[620px]' }) {
  return <div className="overflow-x-auto"><table className={`w-full ${minWidth} border-collapse text-left text-sm`}><thead><tr>{columns.map((column) => <th key={column} scope="col" className="border-b border-brand-choc/10 px-3 py-3 text-xs font-semibold uppercase tracking-wide text-brand-choc/55">{column}</th>)}</tr></thead><tbody>{children}</tbody></table></div>;
}

export function TableRow({ children }) {
  return <tr className="border-b border-brand-choc/5 last:border-0 hover:bg-brand-cream/70">{children}</tr>;
}

export function TableCell({ children, className = '' }) {
  return <td className={`px-3 py-3.5 align-middle ${className}`}>{children}</td>;
}

export function Toggle({ checked, onChange, label }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={onChange} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/40 ${checked ? 'bg-brand-red' : 'bg-brand-potato'}`}>
    <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>;
}
