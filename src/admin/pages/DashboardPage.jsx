import AdminIcon from '../components/AdminIcon';
import { DataTable, PageHeading, Panel, PanelHeading, StatusBadge, TableCell, TableRow, UserAvatar } from '../components/AdminPrimitives';
import { ACTIVITY, MONTHS, ORDERS, STATS } from '../data';

function OrdersTable({ title }) {
  return <Panel>
    <PanelHeading title={title} subtitle="Most recent purchases" />
    <DataTable columns={['Order', 'Customer', 'Total', 'Status', 'Date']} minWidth="min-w-[600px]">
      {ORDERS.map((order) => <TableRow key={order.id}>
        <TableCell className="font-display font-semibold">{order.id}</TableCell><TableCell>{order.customer}</TableCell><TableCell className="font-semibold">{order.total}</TableCell><TableCell><StatusBadge status={order.status} /></TableCell><TableCell className="text-brand-choc/60">{order.date}</TableCell>
      </TableRow>)}
    </DataTable>
  </Panel>;
}

export default function DashboardPage() {
  return <div className="space-y-6 sm:space-y-7">
    <PageHeading title="Welcome back, Admin" subtitle="Here is what's happening today." />

    <section aria-label="Performance overview" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat, index) => <article key={stat.label} className={`rounded-2xl border p-4 sm:p-5 ${index === 0 ? 'border-brand-red bg-brand-red text-brand-tile' : 'border-brand-choc/10 bg-white text-brand-choc shadow-[0_8px_28px_-24px_rgba(37,17,5,0.45)]'}`}>
        <p className={`text-xs font-medium ${index === 0 ? 'text-brand-tile/70' : 'text-brand-choc/55'}`}>{stat.label}</p>
        <div className="mt-2 flex items-end justify-between gap-2"><strong className="font-display text-3xl font-semibold tracking-tight sm:text-[2rem]">{stat.value}</strong><span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${index === 0 ? 'bg-white/15 text-white' : stat.up ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}><AdminIcon name="trend" className={`h-3 w-3 ${stat.up ? '' : 'rotate-90'}`} />{stat.change}</span></div>
        <p className={`mt-2 text-[11px] ${index === 0 ? 'text-brand-tile/60' : 'text-brand-choc/45'}`}>Compared with last month</p>
      </article>)}
    </section>

    <div className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-3"><PanelHeading title="Revenue" subtitle="Monthly revenue in thousands of dollars" /><span className="rounded-lg bg-brand-yellow/20 px-3 py-1.5 text-xs font-semibold text-brand-choc">This year⌄</span></div>
        <div className="flex h-52 items-end gap-2 border-b border-brand-choc/10 px-1 pt-3 sm:gap-4">
          {MONTHS.map((item, index) => <div key={item.month} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2" title={`$${item.value}k`}>
            <div className={`w-full max-w-10 rounded-t-lg transition-colors hover:bg-brand-orange ${index === MONTHS.length - 1 ? 'bg-brand-red' : 'bg-brand-potato'}`} style={{ height: `${item.value}%` }} />
            <span className="text-[10px] text-brand-choc/55 sm:text-xs">{item.month}</span>
          </div>)}
        </div>
      </Panel>
      <Panel>
        <PanelHeading title="Recent activity" subtitle="Latest actions from your users" />
        <ul className="space-y-4">
          {ACTIVITY.map((activity) => <li key={activity.time} className="flex gap-3">
            <UserAvatar name={activity.who} className="h-9 w-9" />
            <div className="min-w-0 flex-1 text-sm leading-snug"><p><strong className="font-semibold">{activity.who}</strong> <span className="text-brand-choc/65">{activity.what}</span></p><time className="mt-1 block text-xs text-brand-choc/45">{activity.time}</time></div>
          </li>)}
        </ul>
      </Panel>
    </div>
    <OrdersTable title="Latest orders" />
  </div>;
}
