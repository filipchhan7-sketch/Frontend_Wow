import { useState } from 'react';
import { PageHeading, Panel, PanelHeading, Toggle } from '../components/AdminPrimitives';

const inputClass = 'w-full rounded-xl border border-brand-choc/15 bg-white px-3 py-2.5 text-sm text-brand-choc outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-brand-yellow/25';

export default function SettingsPage({ showToast }) {
  const [form, setForm] = useState({ name: 'WOW POTATO', email: 'admin@wowpotato.com', language: 'English' });
  const [switches, setSwitches] = useState({ email: true, weekly: false, twofa: true });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const flip = (key) => setSwitches((current) => ({ ...current, [key]: !current[key] }));

  return <div className="space-y-6">
    <PageHeading title="Settings" subtitle="Manage workspace details and preferences." />
    <Panel>
      <PanelHeading title="Workspace" subtitle="Basic details for this admin workspace." />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5"><span className="text-sm font-semibold">Workspace name</span><input value={form.name} onChange={(event) => update('name', event.target.value)} className={inputClass} /></label>
        <label className="space-y-1.5"><span className="text-sm font-semibold">Contact email</span><input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} className={inputClass} /></label>
        <label className="space-y-1.5"><span className="text-sm font-semibold">Language</span><select value={form.language} onChange={(event) => update('language', event.target.value)} className={inputClass}><option>English</option><option>Khmer</option></select></label>
      </div>
    </Panel>
    <Panel>
      <PanelHeading title="Notifications & security" subtitle="Choose how you want to stay informed." />
      <div className="divide-y divide-brand-choc/10">
        {[
          ['email', 'Email alerts', 'Get notified when a new order comes in.'],
          ['weekly', 'Weekly summary', 'A short report every Monday morning.'],
          ['twofa', 'Two-step sign in', 'Ask for a code when signing in on a new device.'],
        ].map(([key, title, description]) => <div key={key} className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0"><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-brand-choc/60">{description}</p></div><Toggle checked={switches[key]} onChange={() => flip(key)} label={title} /></div>)}
      </div>
    </Panel>
    <div className="flex justify-end"><button type="button" onClick={() => showToast('Settings are saved in this preview only')} className="rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-brand-tile shadow-sm transition hover:bg-brand-crimson focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50">Save changes</button></div>
  </div>;
}
