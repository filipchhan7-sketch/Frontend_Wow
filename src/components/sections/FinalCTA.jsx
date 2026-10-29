import { motion } from 'framer-motion';
import { FranchiseCTA } from '../Button';
import EmojiIcon from '../EmojiIcon';

export default function FinalCTA({ location = 'final_cta' }) {
  return (
    <section className="relative overflow-hidden bg-brand-red py-24 text-center text-brand-tile">
      {['🥔', '🍟', '😊', '✨'].map((e, i) => (
        <motion.span key={e} aria-hidden className="absolute select-none text-6xl opacity-30" style={{ left: `${10 + i * 26}%`, top: i % 2 ? '65%' : '10%' }}
          animate={{ y: [0, -18, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 5 + i, repeat: Infinity }}><EmojiIcon emoji={e} className="h-16 w-24" /></motion.span>
      ))}
      <div className="container-x relative">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl font-bold sm:text-7xl">READY TO CREATE WOW?</motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-tile/85">Don’t just buy a franchise. Build WOW POTATO with us.</p>
        <div className="mt-8"><FranchiseCTA location={location} variant="yellow" /></div>
      </div>
    </section>
  );
}
