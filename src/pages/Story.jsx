import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
import FinalCTA from '../components/sections/FinalCTA';
import { VISION, MISSION, SMILE, TIMELINE } from '../data/content';
import EmojiIcon from '../components/EmojiIcon';

const stateStyle = { done: 'bg-brand-yellow', now: 'bg-brand-red text-brand-tile', next: 'bg-brand-tile border-2 border-dashed border-brand-choc/30' };
const stateLabel = { done: 'Done', now: 'Now', next: 'Next' };

export default function Story() {
  return (
    <>
      <section aria-labelledby="story-hero-title" className="relative isolate min-h-[560px] overflow-hidden bg-[#fff8f1] pb-14 pt-28 sm:min-h-[620px] sm:pb-16 sm:pt-36">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 top-[96px] bg-no-repeat opacity-25 sm:hidden"
          style={{ backgroundImage: "url('/images/story-hero-character.webp')", backgroundPosition: 'right bottom', backgroundSize: 'auto 78%' }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 top-[96px] hidden w-[58%] bg-no-repeat sm:block"
          style={{ backgroundImage: "url('/images/story-hero-character.webp')", backgroundPosition: 'right center', backgroundSize: 'auto 112%' }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_38%,rgba(255,190,45,0.2),transparent_42%),linear-gradient(90deg,#fff8f1_0%,rgba(255,248,241,0.98)_42%,rgba(255,248,241,0.78)_61%,rgba(255,248,241,0.08)_100%)]" />
        <div className="container-x relative z-10 grid min-h-[420px] items-center lg:min-h-[490px] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="chip bg-brand-yellow/80">Our story</motion.span>
            <motion.h1
              id="story-hero-title"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-2xl whitespace-pre-line text-4xl font-bold leading-[1.02] text-brand-choc sm:text-5xl lg:text-6xl"
            >
              WE DON’T JUST SELL POTATOES.{'\n'}<span className="text-brand-red">WE DELIVER SMILES.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-5 max-w-xl text-lg font-medium text-brand-choc/75"
            >
              Where WOW POTATO started, why it exists, and where it’s going.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal><div className="card h-full bg-brand-choc text-brand-tile"><span className="chip">Vision</span><p className="mt-4 font-display text-3xl font-semibold leading-snug">{VISION}</p></div></Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full"><span className="chip">Mission</span>
              <p className="mt-4 font-display text-2xl font-semibold">Deliver smiles through…</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">{MISSION.map((m) => <li key={m} className="flex items-center gap-2 font-medium"><span className="text-brand-red">●</span>{m}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-soft/60">
        <div className="container-x">
          <SectionTitle eyebrow="Our values" title="SMILE" sub="Five values that guide how we serve, work and grow." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {SMILE.map((s, i) => (
              <Reveal key={s.letter} delay={i * 0.08} className="h-full">
                <motion.div whileHover={{ y: -8, rotate: i % 2 ? 1.5 : -1.5 }} className="card h-full text-center">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand-red font-display text-5xl font-bold text-brand-tile shadow-pop">{s.letter}</div>
                  <h3 className="mt-5 text-lg font-bold">{s.title}</h3><p className="mt-2 text-sm text-brand-choc/70">{s.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Our journey" title="FROM CAMBODIA TO THE WORLD" />
          <ol className="relative mt-14 space-y-8 border-l-4 border-dashed border-brand-yellow pl-8">
            {TIMELINE.map((t, i) => (
              <motion.li key={t.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: 0.05, duration: 0.5 }} className="relative">
                <span className="absolute -left-[3.2rem] top-1 grid h-10 w-10 place-items-center rounded-full bg-brand-tile text-xl shadow-card"><EmojiIcon emoji={t.emoji} className="h-6 w-10" /></span>
                <div className={`rounded-3xl p-5 ${stateStyle[t.state]}`}>
                  <div className="flex items-center justify-between gap-3"><h3 className="text-xl font-bold">{t.title}</h3><span className="rounded-full bg-brand-choc/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">{stateLabel[t.state]}</span></div>
                  <p className="mt-1 text-sm opacity-80">{t.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
