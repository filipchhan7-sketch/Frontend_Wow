import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV } from '../data/content';
import Button from './Button';

const LOGO_IMAGE = '/images/wow-logo.png';

export function Logo({ light = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2" aria-label="WOW POTATO home">
      <motion.img
        src={LOGO_IMAGE}
        alt="WOW POTATO"
        whileHover={{ rotate: [0, -15, 15, -8, 0] }}
        transition={{ duration: 0.6 }}
        className="h-9 w-9 object-contain"
      />
      <span className={`font-display text-2xl font-bold tracking-tight ${light ? 'text-brand-tile' : 'text-brand-choc'}`}>
        WOW <span className="text-brand-red">POTATO</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'bg-brand-cream/90 shadow-card backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className="text-sm font-semibold transition-colors hover:text-brand-red">
              {({ isActive }) => (
                <span className="relative py-1">
                  {n.label}
                  {isActive && <motion.span layoutId="nav-underline" className="absolute -bottom-0.5 left-0 right-0 h-1 rounded-full bg-brand-red" />}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/franchise/apply" trackEvent location="header" size="sm">
            <span className="hidden sm:inline">🥔 Become a Franchise Partner</span>
            <span className="sm:hidden">🥔 Franchise</span>
          </Button>
          <button
            onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full bg-brand-choc text-brand-tile xl:hidden"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <motion.span animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block h-0.5 rounded bg-brand-tile" />
              <motion.span animate={{ opacity: open ? 0 : 1 }} className="block h-0.5 rounded bg-brand-tile" />
              <motion.span animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block h-0.5 rounded bg-brand-tile" />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden xl:hidden" aria-label="Mobile"
          >
            <div className="container-x flex flex-col gap-1 pb-6 pt-2">
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <NavLink to={n.to} className={({ isActive }) => `block rounded-2xl px-4 py-3 font-display text-2xl font-semibold ${isActive ? 'bg-brand-yellow' : 'hover:bg-brand-yellow/40'}`}>
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
              <Link to="/contact" className="rounded-2xl px-4 py-3 font-display text-2xl font-semibold hover:bg-brand-yellow/40">Contact</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
