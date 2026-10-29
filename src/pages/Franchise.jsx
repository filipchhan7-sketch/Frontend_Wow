import PageHeader from '../components/PageHeader';
import Button, { FranchiseCTA } from '../components/Button';
import { FRANCHISE_WHY } from '../data/content';
import EmojiIcon from '../components/EmojiIcon';

export default function Franchise() {
  return (
    <>
      <PageHeader eyebrow="Franchise opportunity" title={'BRING WOW POTATO\nTO YOUR CITY'} sub="Explore a franchise partnership with a memorable fries brand." emoji="🌆">
        <FranchiseCTA location="franchise_hero">Start your franchise journey →</FranchiseCTA>
      </PageHeader>

      <section className="section">
        <div className="container-x">
          <p className="mx-auto max-w-2xl text-center text-lg text-brand-choc/75">A distinctive long-fries product, a family-friendly brand and a partner-focused opportunity to grow in your market.</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {FRANCHISE_WHY.slice(0, 3).map((f) => <article key={f.title} className="card text-center"><span className="inline-flex h-14 w-14 items-center justify-center text-5xl"><EmojiIcon emoji={f.emoji} className="h-12 w-14" /></span><h2 className="mt-4 text-xl font-bold">{f.title}</h2><p className="mt-2 text-sm text-brand-choc/70">{f.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section bg-brand-soft/60">
        <div className="container-x mx-auto max-w-3xl text-center">
          <p className="chip">Partner support</p>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">START WITH A CONVERSATION</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-choc/75">We’ll discuss your market, goals and the right next steps for a WOW POTATO partnership.</p>
          <div className="mt-7"><Button to="/franchise/apply" size="lg">Tell us about your plans →</Button></div>
        </div>
      </section>

    </>
  );
}
