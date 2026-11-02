import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { COUNTRY_LIST, REGIONS } from '../data/countries';

const Globe = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);
const Chevron = ({ open }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// Close the popup when clicking outside or pressing Escape.
function useDismiss(ref, open, close) {
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) close(); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open, close, ref]);
}

// The popup: search box + scrollable list (ISO code, name, optional dial code).
function CountryList({ items, selectedIso, showDial, showIso = true, onPick }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase().replace(/^\+/, '');
    if (!s) return items;
    return items.filter((c) => c.name.toLowerCase().includes(s) || c.iso.toLowerCase() === s || (showDial && c.dial.startsWith(s)));
  }, [q, items, showDial]);

  useEffect(() => { setActive(0); }, [q]);
  useEffect(() => { listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' }); }, [active]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[active]) onPick(filtered[active]); }
  };

  return (
    <div className="rounded-3xl border border-brand-choc/10 bg-white p-3 shadow-card">
      <input
        autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKeyDown}
        placeholder="Search country" aria-label="Search country" className="input !rounded-full !border-sky-400 !py-2.5"
      />
      <ul ref={listRef} role="listbox" className="mt-2 max-h-64 overflow-y-auto pr-1">
        {filtered.map((c, i) => (
          <li key={c.iso} role="option" aria-selected={c.iso === selectedIso} data-active={i === active}>
            <button
              type="button" onClick={() => onPick(c)} onMouseEnter={() => setActive(i)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${i === active ? 'bg-brand-yellow/50' : ''} ${c.iso === selectedIso ? 'font-bold' : ''}`}
            >
              {showIso && <span className="w-7 shrink-0 text-[11px] font-bold text-brand-choc/70">{c.iso}</span>}
              <span className="flex-1">{c.name}</span>
              {showDial && <span className="text-brand-choc/70">+{c.dial}</span>}
            </button>
          </li>
        ))}
        {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-brand-choc/50">No country found</li>}
      </ul>
    </div>
  );
}

const Popup = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.15 }} className="absolute inset-x-0 top-full z-40 mt-2"
  >
    {children}
  </motion.div>
);

const triggerBase = 'flex h-11 items-center gap-2 rounded-full border-2 bg-white px-4 text-sm font-semibold outline-none transition';
const triggerState = (open, error) =>
  open ? 'border-brand-orange ring-4 ring-brand-yellow/40' : error ? 'border-brand-red' : 'border-brand-choc/10 hover:border-brand-orange';

// ---------- Phone number with country-code selector ----------
const PRIORITY = { 1: 'US', 7: 'RU', 44: 'GB' };

function parsePhone(value) {
  const m = String(value || '').match(/^\+(\d+)\s*(.*)$/);
  if (!m) return { iso: '', local: String(value || '') };
  const digits = m[1];
  for (let len = 4; len >= 1; len -= 1) {
    const code = digits.slice(0, len);
    const hit = COUNTRY_LIST.find((c) => c.iso === PRIORITY[code]) || COUNTRY_LIST.find((c) => c.dial === code);
    if (hit) return { iso: hit.iso, local: (digits.slice(len) + (m[2] ? ` ${m[2]}` : '')).trim() };
  }
  return { iso: '', local: String(value) };
}

export function PhoneInput({ id = 'phone-number', value, onChange, error }) {
  const initial = useMemo(() => parsePhone(value), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [iso, setIso] = useState(initial.iso);
  const [local, setLocal] = useState(initial.local);
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  useDismiss(wrap, open, () => setOpen(false));
  const country = COUNTRY_LIST.find((c) => c.iso === iso);

  // Sends "+855 12345678" (or '' when no number typed) to the parent form.
  const emit = (nextIso, nextLocal) => {
    const c = COUNTRY_LIST.find((x) => x.iso === nextIso);
    const n = nextLocal.trim();
    onChange(n ? `${c ? `+${c.dial} ` : ''}${n}` : '');
  };

  return (
    <div ref={wrap} className="relative">
      <div className="flex gap-2">
        <button
          type="button" aria-label="Country code" aria-haspopup="listbox" aria-expanded={open}
          onClick={() => setOpen((o) => !o)} className={`${triggerBase} shrink-0 ${triggerState(open, error)}`}
        >
          {country ? (<><span className="text-[11px] font-bold">{country.iso}</span><span>+{country.dial}</span></>) : <Globe />}
          <Chevron open={open} />
        </button>
        <input
          id={id} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Phone number" value={local}
          onChange={(e) => { const v = e.target.value.replace(/[^\d\s-]/g, ''); setLocal(v); emit(iso, v); }}
          className={`input !h-11 !rounded-full !py-2 ${error ? 'input-error' : ''}`}
        />
      </div>
      <AnimatePresence>
        {open && (
          <Popup>
            <CountryList items={COUNTRY_LIST} selectedIso={iso} showDial onPick={(c) => { setIso(c.iso); setOpen(false); emit(c.iso, local); }} />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Country selector (optionally limited to one region) ----------
export function CountrySelect({ id = 'country-select', value, region, onPick, error, placeholder = 'Select country' }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  useDismiss(wrap, open, () => setOpen(false));
  const items = useMemo(() => (region ? COUNTRY_LIST.filter((c) => c.region === region) : COUNTRY_LIST), [region]);
  const selected = COUNTRY_LIST.find((c) => c.name === value);

  return (
    <div ref={wrap} className="relative">
      <button
        id={id} type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)}
        className={`${triggerBase} w-full text-left ${triggerState(open, error)}`}
      >
        {selected ? (<><span className="w-6 text-[11px] font-bold">{selected.iso}</span><span className="truncate">{selected.name}</span></>)
          : value ? <span className="truncate">{value}</span>
          : (<><Globe /><span className="font-medium text-brand-choc/40">{placeholder}</span></>)}
        <span className="ml-auto"><Chevron open={open} /></span>
      </button>
      <AnimatePresence>
        {open && (
          <Popup>
            <CountryList items={items} selectedIso={selected?.iso} onPick={(c) => { onPick(c); setOpen(false); }} />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RegionSelect({ id = 'region-select', value, onPick, error, placeholder = 'Select a region' }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  useDismiss(wrap, open, () => setOpen(false));
  const items = useMemo(() => REGIONS.map((name) => ({ iso: name, name })), []);
  const selected = items.find((region) => region.name === value);

  return (
    <div ref={wrap} className="relative">
      <button
        id={id} type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)}
        className={`${triggerBase} w-full text-left ${triggerState(open, error)}`}
      >
        {selected ? <span className="truncate">{selected.name}</span> : <span className="font-medium text-brand-choc/40">{placeholder}</span>}
        <span className="ml-auto"><Chevron open={open} /></span>
      </button>
      <AnimatePresence>
        {open && (
          <Popup>
            <CountryList items={items} selectedIso={selected?.iso} showIso={false} onPick={(region) => { onPick(region.name); setOpen(false); }} />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
}
