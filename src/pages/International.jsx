import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { REGIONS } from '../data/content';

const statusStyle = { Active: 'bg-brand-yellow text-brand-choc', 'Coming Soon': 'bg-brand-yellow', Planned: 'bg-brand-soft', Vision: 'bg-brand-tile border border-brand-choc/20' };

export default function International() {
  return (
    <>
      <PageHeader eyebrow="International franchise" title={'FROM CAMBODIA\nTO THE WORLD 🌎'} sub="Our ambition: become an international potato brand, built with partners in every market." emoji="✈️" />
      <section className="section">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md" aria-label="Expansion rings: Cambodia, Southeast Asia, Asia, Global">
              <div className="absolute inset-0 animate-spin-slower rounded-full border-4 border-dashed border-brand-choc/15" />
              <div className="absolute inset-[14%] animate-spin-slow rounded-full border-4 border-dashed border-brand-orange/40" />
              <div className="absolute inset-[28%] rounded-full border-4 border-dashed border-brand-red/30" />
              {[['Global', 'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2'], ['Asia', 'right-[14%] top-[14%] translate-x-1/2 -translate-y-1/2'], ['SEA', 'left-[28%] bottom-[28%] -translate-x-1/2 translate-y-1/2']].map(([t, c]) => (
                <span key={t} className={`absolute rounded-full bg-brand-choc px-3 py-1 text-xs font-bold text-brand-tile ${c}`}>{t}</span>
              ))}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-red" />
                <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity }} className="relative grid h-32 w-32 place-items-center rounded-full bg-brand-yellow text-center shadow-pop">
                  <div><div className="text-4xl">🇰🇭</div><div className="font-display text-sm font-bold">CAMBODIA</div></div>
                </motion.div>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionTitle center={false} eyebrow="Available territories" title="INTERESTED IN YOUR COUNTRY?" sub="We’re opening select markets to the right partners. Tell us about yours and let’s start a territory discussion." />
            <div className="mt-8"><Button to="/franchise/apply" trackEvent location="international" size="lg">Request a territory discussion</Button></div>
          </div>
        </div>
      </section>
      <section className="section bg-brand-soft/60">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08} className="h-full">
              <motion.div whileHover={{ y: -8 }} className="card h-full">
                <div className="text-5xl">{r.flag}</div>
                <h3 className="mt-3 text-xl font-bold">{r.name}</h3>
                <span className={`mt-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${statusStyle[r.status]}`}>{r.status}</span>
                <p className="mt-3 text-sm text-brand-choc/70">{r.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
