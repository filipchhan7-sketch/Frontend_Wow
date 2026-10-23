import { motion } from 'framer-motion';

export default function ProductCard({ item, onSelect }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      whileHover={{ y: -8 }}
      onClick={() => onSelect?.(item)}
      className="card group flex h-full flex-col overflow-hidden p-0 text-left"
    >
      <div className={`relative grid h-48 place-items-center bg-gradient-to-br ${item.gradient}`}>
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <motion.span className="text-8xl drop-shadow-lg" whileHover={{ rotate: 12, scale: 1.15 }} transition={{ type: 'spring' }}>
            {item.emoji}
          </motion.span>
        )}
        {item.tag && <span className="absolute left-4 top-4 rounded-full bg-brand-choc px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-tile">{item.tag}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold">{item.name}</h3>
        <p className="mt-1 flex-1 text-sm text-brand-choc/70">{item.desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.sizes.map((s) => <span key={s} className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold">{s}</span>)}
        </div>
      </div>
    </motion.button>
  );
}
