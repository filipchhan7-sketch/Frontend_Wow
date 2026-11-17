import { useMemo, useState } from 'react';
import { DataTable, PageHeading, Panel, StatusBadge, TableCell, TableRow, UserAvatar } from '../components/AdminPrimitives';
import { INITIAL_USERS } from '../data';

const controlClass = 'rounded-xl border border-brand-choc/15 bg-white px-3 py-2.5 text-sm text-brand-choc outline-none transition placeholder:text-brand-choc/40 focus:border-brand-orange focus:ring-4 focus:ring-brand-yellow/25';

export default function UsersPage({ showToast }) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const visibleUsers = useMemo(() => users.filter((user) => (role === 'All' || user.role === role) && `${user.name} ${user.email}`.toLowerCase().includes(query.trim().toLowerCase())), [users, role, query]);

  const toggleStatus = (user) => {
    setUsers((current) => current.map((item) => item.id === user.id ? { ...item, status: item.status === 'Active' ? 'Suspended' : 'Active' } : item));
    showToast(`Updated ${user.name}'s status`);
  };

  const removeUser = (user) => {
    setUsers((current) => current.filter((item) => item.id !== user.id));
    showToast(`${user.name} removed from the list`);
  };

  return <div className="space-y-6">
    <PageHeading title="Users" subtitle={`${users.length} people have access to your workspace.`} action={<button type="button" className="rounded-xl bg-brand-red px-4 py-2.5 text-sm font-semibold text-brand-tile shadow-sm transition hover:bg-brand-crimson focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50" onClick={() => showToast('Invite flow will be connected to the backend later')}>Invite user</button>} />
    <Panel className="p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1"><span className="sr-only">Search users by name or email</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or email" className={`${controlClass} w-full`} /></label>
        <label><span className="sr-only">Filter users by role</span><select value={role} onChange={(event) => setRole(event.target.value)} className={`${controlClass} w-full sm:w-40`}><option>All</option><option>Admin</option><option>Editor</option><option>Viewer</option></select></label>
      </div>
      {visibleUsers.length === 0 ? <div className="rounded-xl border border-dashed border-brand-choc/15 px-5 py-12 text-center"><p className="font-display text-lg font-semibold">No users found</p><p className="mt-1 text-sm text-brand-choc/60">Try a different name or role filter.</p></div> : <DataTable columns={['User', 'Role', 'Status', 'Actions']} minWidth="min-w-[680px]">
        {visibleUsers.map((user) => <TableRow key={user.id}>
          <TableCell><div className="flex items-center gap-3"><UserAvatar name={user.name} /><span><strong className="block font-medium">{user.name}</strong><span className="text-xs text-brand-choc/55">{user.email}</span></span></div></TableCell>
          <TableCell>{user.role}</TableCell><TableCell><StatusBadge status={user.status} /></TableCell>
          <TableCell className="text-right"><div className="inline-flex gap-2"><button type="button" onClick={() => toggleStatus(user)} className="rounded-lg border border-brand-choc/15 px-2.5 py-1.5 text-xs font-semibold hover:bg-brand-yellow/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">{user.status === 'Active' ? 'Suspend' : 'Activate'}</button><button type="button" onClick={() => removeUser(user)} className="rounded-lg border border-brand-red/20 px-2.5 py-1.5 text-xs font-semibold text-brand-red hover:bg-brand-red/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red">Remove</button></div></TableCell>
        </TableRow>)}
      </DataTable>}
      <p className="mt-4 text-xs text-brand-choc/50">Showing {visibleUsers.length} of {users.length} users</p>
    </Panel>
  </div>;
}
