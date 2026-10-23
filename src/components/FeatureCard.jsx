import { motion } from 'framer-motion';
import Reveal from './Reveal';

export default function FeatureCard({ emoji, title, text, num, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }} className="card group relative h-full overflow-hidden">
        {num && <span className="absolute right-4 top-1 font-display text-6xl font-bold text-brand-yellow/50">{num}</span>}
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-yellow text-3xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">{emoji}</div>
        <h3 className="mt-5 text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-choc/70">{text}</p>
      </motion.div>
    </Reveal>
  );
}
