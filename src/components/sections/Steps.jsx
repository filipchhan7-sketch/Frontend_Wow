import { motion } from 'framer-motion';
import SectionTitle from '../SectionTitle';
import { FRANCHISE_STEPS } from '../../data/content';

export default function Steps({ bg = '' }) {
  return (
    <section className={`section ${bg}`}>
      <div className="container-x">
        <SectionTitle eyebrow="How the franchise works" title="TEN SIMPLE STEPS FROM HELLO TO GRAND OPENING" sub="A clear path — no guesswork." />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {FRANCHISE_STEPS.map((s, i) => (
            <motion.li key={s} initial={{ opacity: 0, y: 30, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 5) * 0.08, type: 'spring', stiffness: 200, damping: 20 }} whileHover={{ y: -6 }}
              className="card relative pt-10">
              <span className="absolute -top-5 left-6 grid h-12 w-12 place-items-center rounded-full bg-brand-red font-display text-xl font-bold text-brand-tile shadow-pop">{String(i + 1).padStart(2, '0')}</span>
              <p className="font-display text-lg font-semibold leading-tight">{s}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
