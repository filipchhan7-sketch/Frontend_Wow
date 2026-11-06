import { motion, useReducedMotion } from 'framer-motion';
import { MENU_HERO } from '../../data/menu';
import Button from '../Button';

export default function MenuTeaser() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden py-16 sm:py-24" aria-labelledby="home-menu-title">
      <div className="container-x">
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-red sm:text-base">Fresh from our kitchen</p>
            <h2 id="home-menu-title" className="mt-2 font-display text-4xl font-bold leading-none text-brand-choc sm:text-5xl">The Menu</h2>
          </div>
          <Button to="/menu" variant="outline" size="md" className="hidden sm:inline-flex">View all menu →</Button>
        </div>

        <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="group relative isolate grid overflow-hidden rounded-[2rem] bg-[#FFF8E8] shadow-card md:min-h-[440px] md:grid-cols-[1.08fr_0.92fr] lg:min-h-[500px]"
        >
          <div className="relative flex min-h-[290px] items-center justify-center overflow-hidden bg-[#FFFDF8] px-5 py-6 sm:min-h-[390px] md:min-h-full md:px-6 lg:px-10">
            <div aria-hidden="true" className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-brand-yellow/15 blur-2xl sm:h-64 sm:w-64" />
            <motion.img
              src="/images/Golden.png"
              alt="Golden WOW POTATO longest fries in the signature box"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              whileHover={reduceMotion ? undefined : { scale: 1.035, y: -4 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 h-full max-h-[430px] w-full object-contain drop-shadow-[0_18px_20px_rgba(37,17,5,0.12)]"
            />
            <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-brand-choc shadow-sm sm:bottom-7 sm:left-7 sm:text-sm">Made fresh to order</span>
          </div>

          <div className="relative flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-yellow/35 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-choc sm:text-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              {MENU_HERO.badge}
            </span>

            <p className="mt-6 font-display text-3xl italic leading-none text-brand-red sm:text-4xl">The WOW signature</p>
            <h3 className="mt-2 max-w-[12ch] font-display text-4xl font-bold uppercase leading-[0.93] tracking-tight text-brand-choc sm:text-5xl lg:text-6xl">
              Golden<br />Longest Fries
            </h3>

            <p className="mt-5 max-w-md text-base leading-7 text-brand-choc/85 sm:text-lg sm:leading-8">
              Big, golden, extra-long fries with your choice of delicious seasoning. A little crunch, a lot of WOW.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button to="/menu" size="md" variant="primary">Explore the menu <span aria-hidden="true">→</span></Button>
              <span className="text-sm font-semibold text-brand-choc/70 sm:text-base">Find your new favorite</span>
            </div>
          </div>
        </motion.article>

        <div className="mt-5 text-center sm:hidden">
          <Button to="/menu" variant="outline" size="md">View all menu →</Button>
        </div>
      </div>
    </section>
  );
}
