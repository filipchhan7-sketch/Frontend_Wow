import { motion, useReducedMotion } from 'framer-motion';
import SectionTitle from '../SectionTitle';
import { MenuImage } from '../MenuTitle';
import Button from '../Button';
import { MENU } from '../../data/menu';

export default function MenuTeaser() {
  const reduceMotion = useReducedMotion();
  const featuredItems = MENU.slice(0, 3);

  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle eyebrow="The menu" title="PICK YOUR WOW" sub="Long, golden and made to be shared." />

        <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-[1.08fr_0.92fr]">
          {featuredItems.map((item, index) => {
            const featured = index === 0;

            return (
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                transition={reduceMotion ? { duration: 0 } : {
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative isolate overflow-hidden rounded-[2rem] border border-brand-choc/10 shadow-card ${item.bg} ${item.text} ${
                  featured ? 'min-h-[430px] sm:min-h-[500px] md:row-span-2' : 'min-h-[245px] sm:min-h-[270px]'
                }`}
              >
                <div className={`relative z-10 flex h-full flex-col ${featured ? 'min-h-[430px] p-6 sm:min-h-[500px] sm:p-9' : 'min-h-[245px] p-5 sm:min-h-[270px] sm:p-7'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-75">
                      {featured ? 'Featured' : 'Menu favorite'}
                    </span>
                    <span aria-hidden="true" className="font-display text-sm font-bold tabular-nums opacity-75">
                      0{index + 1} <span className="mx-1 opacity-50">/</span> 03
                    </span>
                  </div>

                  <div className={`mt-5 ${featured ? 'max-w-[11ch]' : 'max-w-[12ch]'}`}>
                    <h3 className={`font-display font-bold uppercase leading-[0.92] tracking-tight ${
                      featured ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-4xl'
                    }`}>
                      {item.name}
                    </h3>
                    {item.price && (
                      <p className={`mt-3 font-display font-bold ${featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                        {item.price}
                      </p>
                    )}
                  </div>

                  <div
                    className={`pointer-events-none absolute bottom-0 right-0 z-0 flex items-end justify-center ${
                      featured ? 'h-[64%] w-[78%] sm:h-[70%] sm:w-[72%]' : 'h-[72%] w-[54%] sm:h-[78%] sm:w-[56%]'
                    }`}
                  >
                    <div className={`flex h-full w-full items-end justify-center transition-transform duration-500 motion-safe:group-hover:rotate-[-3deg] motion-safe:group-hover:scale-105 ${
                      featured
                        ? '[&>span]:text-[10rem] sm:[&>span]:text-[13rem]'
                        : '[&>span]:text-[7.5rem] sm:[&>span]:text-[9rem]'
                    }`}>
                      <MenuImage
                        src={item.image}
                        emoji={item.emoji}
                        alt={item.name}
                        className="h-full w-full object-contain object-bottom drop-shadow-[0_22px_18px_rgba(37,17,5,0.24)]"
                      />
                    </div>
                  </div>

                  {featured && (
                    <span aria-hidden="true" className="absolute bottom-5 left-6 z-10 font-display text-3xl text-brand-choc/25 sm:bottom-7 sm:left-9 sm:text-4xl">
                      ✳
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="pt-10 text-center sm:pt-12">
          <Button to="/menu" size="lg" variant="yellow">See all menu →</Button>
        </div>
      </div>
    </section>
  );
}