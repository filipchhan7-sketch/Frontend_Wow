export const ADMIN_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'orders', label: 'Orders', icon: 'orders' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export const STATS = [
  { label: 'Total revenue', value: '$48,260', change: '+12.5%', up: true },
  { label: 'New users', value: '1,284', change: '+8.2%', up: true },
  { label: 'Orders', value: '932', change: '-2.4%', up: false },
  { label: 'Active sessions', value: '312', change: '+4.1%', up: true },
];

export const MONTHS = [
  { month: 'Jan', value: 42 }, { month: 'Feb', value: 55 }, { month: 'Mar', value: 48 },
  { month: 'Apr', value: 70 }, { month: 'May', value: 62 }, { month: 'Jun', value: 85 },
  { month: 'Jul', value: 78 }, { month: 'Aug', value: 92 },
];

export const ACTIVITY = [
  { who: 'Sokha Chan', what: 'created a new account', time: '5 min ago' },
  { who: 'Dara Kim', what: 'placed order #1042', time: '22 min ago' },
  { who: 'Srey Pich', what: 'updated her profile', time: '1 hour ago' },
  { who: 'Vireak Lim', what: 'requested a refund', time: '3 hours ago' },
];

export const INITIAL_USERS = [
  { id: 1, name: 'Sokha Chan', email: 'sokha@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Dara Kim', email: 'dara@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Srey Pich', email: 'srey@example.com', role: 'Viewer', status: 'Suspended' },
  { id: 4, name: 'Vireak Lim', email: 'vireak@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Malis Noun', email: 'malis@example.com', role: 'Viewer', status: 'Active' },
  { id: 6, name: 'Rithy Sok', email: 'rithy@example.com', role: 'Viewer', status: 'Suspended' },
];

export const ORDERS = [
  { id: '#1042', customer: 'Dara Kim', total: '$120.00', status: 'Paid', date: 'Nov 10' },
  { id: '#1041', customer: 'Malis Noun', total: '$64.50', status: 'Pending', date: 'Nov 10' },
  { id: '#1040', customer: 'Sokha Chan', total: '$210.00', status: 'Paid', date: 'Nov 9' },
  { id: '#1039', customer: 'Vireak Lim', total: '$38.00', status: 'Refunded', date: 'Nov 8' },
  { id: '#1038', customer: 'Srey Pich', total: '$89.90', status: 'Paid', date: 'Nov 8' },
];

export const initials = (name) => name.split(' ').map((part) => part[0]).join('');
