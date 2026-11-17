import { PageHeading, Panel, PanelHeading, StatusBadge, DataTable, TableCell, TableRow } from '../components/AdminPrimitives';
import { ORDERS } from '../data';

export default function OrdersPage() {
  return <div className="space-y-6">
    <PageHeading title="Orders" subtitle="Review recent purchases and payment status." />
    <Panel>
      <PanelHeading title="All orders" subtitle={`${ORDERS.length} sample orders`} />
      <DataTable columns={['Order', 'Customer', 'Total', 'Status', 'Date']} minWidth="min-w-[600px]">
        {ORDERS.map((order) => <TableRow key={order.id}>
          <TableCell className="font-display font-semibold">{order.id}</TableCell><TableCell>{order.customer}</TableCell><TableCell className="font-semibold">{order.total}</TableCell><TableCell><StatusBadge status={order.status} /></TableCell><TableCell className="text-brand-choc/60">{order.date}</TableCell>
        </TableRow>)}
      </DataTable>
    </Panel>
  </div>;
}
