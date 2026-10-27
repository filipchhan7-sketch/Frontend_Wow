import { useState } from 'react';
import { motion } from 'framer-motion';

// Shows the photo, or the emoji if the photo is missing / not added yet.
export function MenuImage({ src, emoji, alt, className = '' }) {
  const [failed, setFailed] = useState(!src);
  if (failed) return <span aria-hidden className="select-none text-[8rem] drop-shadow-xl sm:text-[11rem]">{emoji}</span>;
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

// One big color-block tile of the menu.
export default function MenuTile({ item, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative min-h-[300px] overflow-hidden sm:min-h-[400px] ${item.bg} ${item.text}`}
    >
      <div className="relative z-10 p-6 sm:p-10">
        <h3 className="max-w-[10ch] text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">{item.name}</h3>
        {item.price && <p className="mt-4 font-display text-xl font-bold sm:text-3xl">{item.price}</p>}
      </div>

      <motion.div
        className="absolute inset-y-0 right-0 flex w-[66%] items-end justify-end sm:w-[62%]"
        initial={{ x: 90, rotate: 8, opacity: 0 }}
        whileInView={{ x: 0, rotate: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.15 }}
      >
        <div className="flex h-[92%] w-full translate-x-[6%] translate-y-[6%] items-end justify-end transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110">
          <MenuImage src={item.image} emoji={item.emoji} alt={item.name} className="h-full w-full object-contain object-right-bottom drop-shadow-2xl" />
        </div>
      </motion.div>
    </motion.article>
  );
}