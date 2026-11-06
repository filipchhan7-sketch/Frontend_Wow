import { motion, useReducedMotion } from 'framer-motion';
import { MENU } from '../data/menu';
import FinalCTA from '../components/sections/FinalCTA';

const PHOTOS = {
  'golden-longest-fries': '/images/Golden.png',
  'signature-mix': '/images/Signature mix (2).png',
  'spicy-long-potato': '/images/spicy_.png',
  'chicken-pop': '/images/Chicken pop.png',
  'fried-nugget': '/images/Fried nugget.png',
  'chicken-ring': '/images/Chicken ring_.png',
  'chicken-wing': '/images/Chicken Wing_.png',
};

// Short "pop" with slight overshoot (cheap tween, no spring physics)
const POP_EASE = [0.34, 1.56, 0.64, 1];

function DishRow({ item, index, reduceMotion }) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: (index % 2) * 0.06, ease: POP_EASE }}
      className="group relative grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-3 border-b border-brand-choc/15 py-5 last:border-b-0 sm:gap-6 sm:py-7"
    >
      <div className="relative flex min-h-44 items-center justify-center overflow-hidden rounded-[1.5rem] bg-brand-soft/55 sm:min-h-64">
        <span aria-hidden="true" className="absolute h-[82%] w-[82%] rounded-full bg-brand-cream/80" />
        <img
          src={PHOTOS[item.id] || item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="relative h-44 w-full scale-110 object-contain p-0 drop-shadow-[0_14px_12px_rgba(37,17,5,.16)] transition-transform duration-300 ease-out will-change-transform group-hover:-rotate-2 group-hover:scale-[1.17] sm:h-64"
        />
      </div>
      <div className="py-2 sm:py-4">
        <h3 className="font-display text-xl font-extrabold leading-[.98] tracking-tight text-brand-choc sm:text-3xl">{item.name}</h3>
        <p className="mt-2 text-xs leading-relaxed text-brand-choc/70 sm:mt-3 sm:text-sm">
          Crispy, golden, and full of flavor. The perfect little treat for your next potato break.
        </p>
        <p className="mt-3 font-display text-base font-bold text-brand-red sm:text-xl">{item.price || 'Ask in store'}</p>
      </div>
    </motion.article>
  );
}

function MenuCollection({ title, items, reduceMotion, startIndex }) {
  if (!items.length) return null;
  const id = `menu-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  return (
    <section className="mt-14 sm:mt-20" aria-labelledby={id}>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, ease: POP_EASE }}
        className="mb-3 flex items-center gap-4 sm:mb-5"
      >
        <h2 id={id} className="font-display text-3xl font-extrabold text-brand-choc sm:text-4xl">{title}</h2>
        <span className="h-px flex-1 bg-brand-red/30" />
        <span className="font-display text-sm font-bold uppercase tracking-wider text-brand-red">{String(items.length).padStart(2, '0')} picks</span>
      </motion.div>
      <div className="grid gap-x-10 md:grid-cols-2">
        {items.map((item, index) => <DishRow key={item.id} item={item} index={startIndex + index} reduceMotion={reduceMotion} />)}
      </div>
    </section>
  );
}

export default function Menu() {
  const reduceMotion = useReducedMotion();
  const featured = MENU.find((item) => item.id === 'golden-longest-fries');
  const rest = MENU.filter((item) => item !== featured);
  const fries = rest.filter((item) => item.id.includes('signature') || item.id.includes('spicy-long'));
  const snacks = rest.filter((item) => !fries.includes(item));

  return (
    <>
      <div className="bg-brand-cream">
        <section className="relative overflow-hidden bg-brand-yellow pt-28 sm:pt-32">
          <div aria-hidden="true" className="absolute -left-24 -top-16 h-80 w-80 rounded-full bg-brand-tile/40 blur-3xl" />
          <div className="container-x relative grid items-center gap-5 pb-10 sm:grid-cols-2 sm:gap-10 sm:pb-14">
            {featured && (
              <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
                <span aria-hidden="true" className="absolute h-[82%] w-[82%] rounded-full bg-brand-tile/70" />
                <motion.img
                  src={PHOTOS[featured.id]}
                  alt={featured.name}
                  loading="eager"
                  decoding="async"
                  initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: POP_EASE }}
                  className="relative h-80 w-full scale-110 object-contain drop-shadow-[0_20px_18px_rgba(37,17,5,.2)] sm:h-[540px]"
                />
                <motion.span
                  initial={reduceMotion ? false : { scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.45, delay: 0.35, ease: POP_EASE }}
                  className="absolute right-2 top-3 grid h-20 w-20 place-items-center rounded-full bg-brand-red text-center font-display text-xs font-bold uppercase leading-tight text-brand-tile shadow-card sm:right-4 sm:top-8 sm:h-24 sm:w-24 sm:text-sm"
                >
                  A WOW<br />favorite
                </motion.span>
              </div>
            )}
            <div className="px-1 sm:pl-6">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              >
                <p className="text-xs font-bold uppercase tracking-[.22em] text-brand-red">Made for the good mood</p>
                <h1 className="mt-3 font-display text-4xl font-extrabold leading-[.95] tracking-tight text-brand-choc sm:text-6xl">Golden<br />Longest Fries</h1>
                <p className="mt-3 font-display text-lg font-bold text-brand-red sm:text-xl">{featured?.price}</p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-choc/75 sm:text-base">Long, golden, and crisp all the way through. The signature WOW Potato favorite.</p>
                <a href="#menu-selections" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-3 text-xs font-bold uppercase tracking-wider text-brand-tile shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-choc active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-choc">Explore the menu <span aria-hidden="true">↓</span></a>
              </motion.div>
            </div>
          </div>
          <svg className="relative -mb-px block h-10 w-full fill-brand-cream sm:h-16" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 36C240 106 403 105 660 56s492-84 780-8v52H0z" /></svg>
        </section>

        <div id="menu-selections" className="container-x pb-12 pt-5 sm:pb-20 sm:pt-8">
          <div className="mx-auto max-w-5xl">
            <MenuCollection title="Signature fries" items={fries} reduceMotion={reduceMotion} startIndex={1} />
            <MenuCollection title="Snacks" items={snacks} reduceMotion={reduceMotion} startIndex={1 + fries.length} />
            <p className="mt-10 text-center text-xs text-brand-choc/55">Menu items shown are sample content. Availability may vary by store.</p>
          </div>
        </div>
      </div>
      <FinalCTA location="menu_page" />
    </>
  );
}