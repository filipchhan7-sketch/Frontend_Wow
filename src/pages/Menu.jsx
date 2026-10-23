import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import FinalCTA from '../components/sections/FinalCTA';
import { MENU, MENU_CATEGORIES } from '../data/menu';

function Modal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-brand-choc/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={item.name} onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, scale: 0.9, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, scale: 0.95, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-brand-tile shadow-2xl">
        <div className={`grid h-56 place-items-center bg-gradient-to-br ${item.gradient}`}>
          {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : <motion.span initial={{ scale: 0.4, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.1 }} className="text-9xl drop-shadow-xl">{item.emoji}</motion.span>}
        </div>
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-brand-tile font-bold shadow-card">✕</button>
        <div className="p-6 sm:p-8">
          {item.tag && <span className="chip">{item.tag}</span>}
          <h3 className="mt-2 text-3xl font-bold">{item.name}</h3>
          <p className="mt-2 text-brand-choc/75">{item.desc}</p>
          <div className="mt-5"><p className="text-xs font-bold uppercase tracking-wider text-brand-choc/50">Sizes</p><div className="mt-2 flex flex-wrap gap-2">{item.sizes.map((s) => <span key={s} className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold">{s}</span>)}</div></div>
          <div className="mt-4"><p className="text-xs font-bold uppercase tracking-wider text-brand-choc/50">Flavor options</p><div className="mt-2 flex flex-wrap gap-2">{item.flavors.map((s) => <span key={s} className="rounded-full bg-brand-yellow px-3 py-1 text-sm font-semibold">{s}</span>)}</div></div>
          <div className="mt-6"><Button to="/stores" variant="dark">Find a store near you →</Button></div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Menu() {
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);
  const tabs = ['All', ...MENU_CATEGORIES];
  const items = cat === 'All' ? MENU : MENU.filter((m) => m.category === cat);

  return (
    <>
      <PageHeader eyebrow="The menu" title={'PICK YOUR\nWOW.'} sub="Signature fries, chicken & sides, drinks and limited-time specials." emoji="🍟" />
      <section className="section">
        <div className="container-x">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0" role="tablist">
            {tabs.map((t) => (
              <button key={t} role="tab" aria-selected={cat === t} onClick={() => setCat(t)} className="relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold">
                {cat === t && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-brand-choc" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className={`relative ${cat === t ? 'text-brand-tile' : 'text-brand-choc hover:text-brand-red'}`}>{t}</span>
              </button>
            ))}
          </div>
          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => <ProductCard key={item.id} item={item} onSelect={setSelected} />)}
            </AnimatePresence>
          </motion.div>
          <p className="mt-10 text-center text-xs text-brand-choc/50">Menu items shown are sample content. Availability may vary by store.</p>
        </div>
      </section>
      <AnimatePresence>{selected && <Modal item={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
      <FinalCTA location="menu_page" />
    </>
  );
}
