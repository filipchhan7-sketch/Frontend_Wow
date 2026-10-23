import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { STORES } from '../data/stores';
import { track } from '../lib/analytics';

export default function Stores() {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(STORES[0].id);
  const filtered = STORES.filter((s) => `${s.name} ${s.mall} ${s.city} ${s.address}`.toLowerCase().includes(q.toLowerCase()));
  const store = STORES.find((s) => s.id === sel) ?? filtered[0];

  const pick = (s) => { setSel(s.id); track('store_selected', { store: s.id }); };

  return (
    <>
      <PageHeader eyebrow="Our stores" title="FIND YOUR WOW" sub="Search by city or mall and come say hi." emoji="📍" />
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔎  Search city or mall…" className="input" aria-label="Search stores" />
            <div className="mt-5 space-y-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((s) => (
                  <motion.button layout key={s.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onClick={() => pick(s)}
                    className={`card w-full text-left transition ${store?.id === s.id ? 'ring-4 ring-brand-yellow' : 'hover:-translate-y-1'}`}>
                    <p className="font-display text-lg font-bold">{s.mall}</p>
                    <p className="text-sm text-brand-choc/60">{s.city} · {s.hours}</p>
                  </motion.button>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && <p className="card text-center text-sm">No stores match “{q}”. More locations coming soon!</p>}
            </div>
          </div>

          <div className="lg:col-span-3">
            {store && (
              <motion.div key={store.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card overflow-hidden p-0 lg:sticky lg:top-24">
                <iframe title={`Map of ${store.name}`} loading="lazy" className="h-72 w-full border-0 sm:h-96"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}&output=embed`} />
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{store.name}</h3>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <div><dt className="font-bold text-brand-choc/50">Address</dt><dd>{store.address}</dd></div>
                    <div><dt className="font-bold text-brand-choc/50">Opening hours</dt><dd>{store.hours}</dd></div>
                    <div><dt className="font-bold text-brand-choc/50">Phone</dt><dd>{store.phone}</dd></div>
                    <div><dt className="font-bold text-brand-choc/50">Social</dt><dd><a href={store.social} className="underline">Follow this store</a></dd></div>
                  </dl>
                  <div className="mt-5"><Button href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}`} variant="primary">Open in Google Maps ↗</Button></div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
