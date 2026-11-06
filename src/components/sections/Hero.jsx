import { motion, useReducedMotion } from 'framer-motion';
import Button, { FranchiseCTA } from '../Button';

const line = (words, base) => (
  <span className="flex flex-wrap gap-x-[0.26em] lg:flex-nowrap">
    {words.map((word, index) => (
      <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
        <motion.span
          className="inline-block whitespace-nowrap"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ delay: base + index * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </span>
);

// transparent on the left (where the text is), full photo on the right
const fadeMask =
  'linear-gradient(90deg, transparent 0%, transparent 14%, rgba(0,0,0,0.6) 32%, #000 52%)';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#fff8f1] pb-10 pt-28 sm:pt-36 lg:min-h-[620px] lg:pb-16">
      {/* soft warm glow behind the text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_40%,rgba(255,190,45,0.22),transparent_50%)]"
      />

      {/* BACKGROUND PHOTO: right side only, below the navbar, never under the text */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-0 mx-4 mt-8 h-72 rounded-3xl bg-contain bg-center bg-no-repeat sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:top-28 lg:mx-0 lg:mt-0 lg:h-auto lg:w-[56%] lg:rounded-none lg:bg-right-bottom lg:[-webkit-mask-image:linear-gradient(90deg,transparent_0%,transparent_14%,rgba(0,0,0,0.6)_32%,#000_52%)] lg:[mask-image:linear-gradient(90deg,transparent_0%,transparent_14%,rgba(0,0,0,0.6)_32%,#000_52%)]"
        style={{ backgroundImage: "url('/images/A3%20Light.png')" }}
      />

      {/* TEXT: stays in the left half */}
      <div className="container-x relative z-10 lg:absolute lg:inset-x-0 lg:top-28 lg:bottom-0 lg:flex lg:items-center">
        <div className="min-w-0 lg:w-1/2">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="chip bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-choc sm:text-base"
          >
            <span aria-hidden="true">🇰🇭</span> Proudly from Cambodia
          </motion.span>

          <h1
            className="mt-5 font-display font-extrabold leading-[1.04] text-brand-choc"
            style={{ fontSize: 'clamp(1.9rem, 3.3vw, 3.2rem)' }}
          >
            <span className="block">{line(['THE', 'LONGEST', 'FRIES.'], 0.1)}</span>
            <span className="block text-brand-red">{line(['THE', 'BIGGEST', 'SMILES.'], 0.45)}</span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-5 max-w-md text-base font-medium leading-relaxed text-brand-choc/80 sm:text-lg"
          >
            More Than Fries. It's a WOW Experience.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <FranchiseCTA location="hero" size="md" />
            <Button to="/menu" variant="outline" size="md">
              Explore the menu <span aria-hidden="true">→</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
