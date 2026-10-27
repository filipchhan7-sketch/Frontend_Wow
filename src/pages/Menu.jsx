import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MenuImage } from '../components/MenuTitle';
import FinalCTA from '../components/sections/FinalCTA';
import { MENU, MENU_HERO } from '../data/menu';

function getCategory(item) {
  if (item.category) return item.category;
  return item.id.includes('chicken') || item.id.includes('nugget') ? 'Chicken & Sides' : 'Signature Fries';
}

export default function Menu() {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const items = MENU.map((item, index) => ({ ...item, category: getCategory(item), menuIndex: index }));
  const visibleItems = expanded ? items : items.slice(0, 4);
  const groups = [...new Set(items.map((item) => item.category))]
    .map((category) => ({
      category,
      items: visibleItems.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-yellow pt-28">
        <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-brand-tile/50 blur-3xl" />
        <div className="container-x relative grid items-center gap-6 pb-16 md:grid-cols-2">
          <div>
            <motion.span initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="chip bg-brand-tile/70">Our menu</motion.span>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 whitespace-pre-line text-5xl font-bold uppercase leading-[0.95] text-brand-choc sm:text-7xl"
            >
              {MENU_HERO.name}
            </motion.h1>
            {MENU_HERO.badge && (
              <p className="mt-5 flex items-center gap-2 text-xl font-semibold text-brand-choc">
                <motion.span
                  animate={reduceMotion ? undefined : { rotate: [0, 25, 0], scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-brand-red"
                >✦</motion.span>
                {MENU_HERO.badge}
              </p>
            )}
          </div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 100, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.2 }}
            className="flex justify-center"
          >
            <MenuImage src={MENU_HERO.image} emoji={MENU_HERO.emoji} alt={MENU_HERO.name} className="w-full max-w-lg animate-float drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div id="menu-list" className="mx-auto mt-2 max-w-3xl border-y-2 border-brand-choc/80">
            {groups.length > 0 ? (
              <AnimatePresence initial={false}>
                {groups.map(({ category, items: categoryItems }) => (
                  <motion.section
                    key={category}
                    layout={!reduceMotion}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    aria-labelledby={`menu-category-${category.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
                  >
                    <div className="flex items-center gap-4 border-b border-brand-choc/20 py-5 sm:py-6">
                      <h2
                        id={`menu-category-${category.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
                        className="shrink-0 font-display text-xl font-bold uppercase tracking-wide text-brand-choc sm:text-2xl"
                      >
                        {category}
                      </h2>
                      <span aria-hidden="true" className="h-px flex-1 bg-brand-red/50" />
                    </div>
                    <motion.ul
                      layout={!reduceMotion}
                      className="divide-y divide-brand-choc/20"
                      aria-label={`${category} menu items`}
                    >
                      <AnimatePresence initial={false}>
                        {categoryItems.map((item) => (
                          <motion.li
                            key={item.id}
                            layout={!reduceMotion}
                            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                            transition={reduceMotion ? { duration: 0 } : {
                              duration: 0.35,
                              delay: item.menuIndex < 4 ? item.menuIndex * 0.045 : (item.menuIndex - 4) * 0.045,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group flex items-baseline justify-between gap-4 py-5 sm:py-6"
                          >
                            <span className="flex min-w-0 items-baseline gap-4 sm:gap-6">
                              <span aria-hidden="true" className="w-7 shrink-0 font-display text-xs font-bold tabular-nums text-brand-red/80 sm:w-9">
                                {String(item.menuIndex + 1).padStart(2, '0')}
                              </span>
                              <span className="text-xl font-bold uppercase leading-tight text-brand-choc transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-red sm:text-2xl">
                                {item.name}
                              </span>
                            </span>
                            {item.price && <span className="shrink-0 text-sm font-bold tracking-wide text-brand-choc sm:text-base">{item.price}</span>}
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </motion.ul>
                  </motion.section>
                ))}
              </AnimatePresence>
            ) : (
              <p className="py-8 text-center text-brand-choc/70">No menu items are available right now.</p>
            )}
          </div>

          {items.length > 4 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                aria-controls="menu-list"
                className="group inline-flex items-center gap-3 border-b-2 border-brand-choc px-1 py-3 text-sm font-bold uppercase tracking-[0.14em] text-brand-choc transition-colors hover:border-brand-red hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
              >
                {expanded ? 'Show less' : 'See more'}
                <motion.span
                  aria-hidden="true"
                  animate={reduceMotion ? undefined : { y: expanded ? -2 : 2 }}
                  transition={reduceMotion ? { duration: 0 } : { repeat: Infinity, repeatType: 'reverse', duration: 0.65, ease: 'easeInOut' }}
                >↓</motion.span>
              </button>
            </div>
          )}
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-brand-choc/75">
            Menu items shown are sample content. Availability may vary by store.
          </p>
        </div>
      </section>
      <FinalCTA location="menu_page" />
    </>
  );
}
