import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';
import Reveal from '../components/Reveal';
import Button, { FranchiseCTA } from '../components/Button';
import Steps from '../components/sections/Steps';
import FinalCTA from '../components/sections/FinalCTA';
import { FRANCHISE_WHY, FORMATS, WHAT_YOU_GET, PROFILES } from '../data/content';

export default function Franchise() {
  return (
    <>
      <PageHeader eyebrow="Franchise opportunity" title={'BRING WOW POTATO\nTO YOUR CITY'} sub="Become part of the next generation of potato entrepreneurs." emoji="🌆">
        <FranchiseCTA location="franchise_hero">Start your franchise journey →</FranchiseCTA>
      </PageHeader>

      <section className="section">
        <div className="container-x">
          <SectionTitle eyebrow="Why franchise WOW POTATO?" title="SIX REASONS TO BUILD WITH US" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FRANCHISE_WHY.map((f, i) => <FeatureCard key={f.title} {...f} num={String(i + 1).padStart(2, '0')} delay={i * 0.07} />)}
          </div>
        </div>
      </section> 

      <Steps bg="bg-brand-soft/60" />

      <section className="section">
        <div className="container-x">
          <SectionTitle eyebrow="Franchise opportunity" title="BUILD WOW POTATO IN YOUR MARKET" sub="Flexible formats for different locations. Sizes and investment figures are shared once our commercial model is finalized." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FORMATS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08} className="h-full">
                <motion.div whileHover={{ y: -8 }} className="card h-full text-center">
                  <div className="text-6xl">{f.emoji}</div>
                  <h3 className="mt-3 text-2xl font-bold">{f.name}</h3>
                  <p className="mt-1 text-sm text-brand-choc/60">{f.where}</p>
                  <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-2xl bg-brand-soft p-3"><p className="font-bold text-brand-choc/50">Size</p><p className="font-display text-lg font-bold">{f.size}</p></div>
                    <div className="rounded-2xl bg-brand-soft p-3"><p className="font-bold text-brand-choc/50">Investment</p><p className="font-display text-lg font-bold">Contact us</p></div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-choc text-brand-tile">
        <div className="container-x">
          <SectionTitle light eyebrow="What you get" title="A SYSTEM, NOT JUST A SIGN" sub="From store design to continuous improvement, we support you at every stage." />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHAT_YOU_GET.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.07} className="h-full">
                <div className="h-full rounded-3xl bg-brand-tile/10 p-6 transition hover:bg-brand-tile/15">
                  <div className="flex items-center gap-3"><span className="text-3xl">{g.emoji}</span><h3 className="text-xl font-bold text-brand-yellow">{g.title}</h3></div>
                  <ul className="mt-4 space-y-2 text-sm text-brand-tile/85">{g.items.map((it) => <li key={it} className="flex gap-2"><span className="text-brand-yellow">✓</span>{it}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionTitle eyebrow="Franchisee profile" title="WHO ARE WE LOOKING FOR?" sub="You don’t need to be a potato expert. You need the passion, capability and commitment to grow the brand." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROFILES.map((p, i) => <FeatureCard key={p.title} {...p} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      <section className="bg-brand-yellow py-16">
        <div className="container-x flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div><h2 className="text-4xl font-bold sm:text-5xl">FROM CAMBODIA TO THE WORLD 🌎</h2><p className="mt-2 max-w-xl font-medium text-brand-choc/75">Interested in developing WOW POTATO in your country? Let’s talk territories.</p></div>
          <Button to="/international" variant="dark" size="lg">Explore international →</Button>
        </div>
      </section>

      <FinalCTA location="franchise_final" />
    </>
  );
}
