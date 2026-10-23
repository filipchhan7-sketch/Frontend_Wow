import { motion } from 'framer-motion';
import Button, { FranchiseCTA } from '../Button';
import FryBox from '../FryBox';

const line = (words, base) => words.map((w, i) => (
  <span key={w + i} className="mr-3 inline-block overflow-hidden align-bottom">
    <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: base + i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
  </span>
));

const BADGES = [
  { e: '😊', cls: 'left-2 top-10 sm:left-0', d: 0 }, { e: '🧀', cls: 'right-2 top-24 sm:right-0', d: 0.6 },
  { e: '🌶️', cls: 'bottom-24 left-0', d: 1.1 }, { e: '✨', cls: 'bottom-10 right-6', d: 0.3 },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-yellow pb-20 pt-32 sm:pt-40">
      <div className="absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-brand-orange/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-brand-tile/50 blur-3xl" />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="chip bg-brand-tile/70">🇰🇭 Proudly from Cambodia</motion.span>
          <h1 className="mt-5 text-5xl font-bold leading-[0.95] sm:text-7xl xl:text-8xl">
            <span className="block">{line(['THE', 'LONGEST', 'FRIES.'], 0.1)}</span>
            <span className="block text-brand-red">{line(['THE', 'BIGGEST', 'SMILES.'], 0.45)}</span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-6 max-w-lg text-lg font-medium text-brand-choc/80">
            A fun, flavorful potato brand built for the next generation of snack lovers.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} className="mt-8 flex flex-wrap items-center gap-4">
            <FranchiseCTA location="hero" />
            <Button to="/menu" variant="outline" size="lg">Explore WOW POTATO</Button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 70, delay: 0.3 }} className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-6 rounded-full bg-brand-tile/50" />
          <FryBox className="relative animate-float drop-shadow-2xl" />
          {BADGES.map((b) => (
            <motion.span key={b.e} className={`absolute grid h-14 w-14 place-items-center rounded-full bg-brand-tile text-3xl shadow-card ${b.cls}`}
              animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: b.d }}>
              {b.e}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
