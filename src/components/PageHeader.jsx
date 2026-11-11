import { motion } from 'framer-motion';

import EmojiIcon from './EmojiIcon';

export default function PageHeader({ eyebrow, title, sub, emoji = '🥔', heroBackground, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-yellow pb-16 pt-36 sm:pb-24 sm:pt-44">
      {heroBackground && <>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-24 -z-10 bg-cover bg-center bg-no-repeat md:left-[38%]" style={{ backgroundImage: `url('${heroBackground}')` }} />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-24 -z-10 bg-[linear-gradient(90deg,#f7ac00_0%,rgba(247,172,0,0.96)_38%,rgba(247,172,0,0.72)_62%,rgba(247,172,0,0.3)_100%)]" />
      </>}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-tile/40 blur-3xl" />
      {!heroBackground && <motion.span
        aria-hidden
        className="absolute right-6 top-28 select-none text-[7rem] sm:right-20 sm:text-[11rem]"
        initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
        animate={{ opacity: 0.9, rotate: 12, scale: 1 }}
        transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
      >
        <EmojiIcon emoji={emoji} className="h-16 w-28 sm:h-20 sm:w-32" />
      </motion.span>}
      <div className="container-x relative">
        <div>
          {eyebrow && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="chip bg-brand-tile/70">{eyebrow}</motion.span>}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-3xl whitespace-pre-line text-5xl font-bold leading-[1] sm:text-7xl"
          >
            {title}
          </motion.h1>
          {sub && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-5 max-w-xl text-lg font-medium text-brand-choc/75">
              {sub}
            </motion.p>
          )}
          {children && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">{children}</motion.div>}
        </div>
      </div>
    </section>
  );
}
