import Reveal from '../Reveal';
import Button from '../Button';
import { VISION } from '../../data/content';

export default function StoryTeaser() {
  return (
    <section className="section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="chip">Our story</span>
          <h2 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-6xl">WE DON’T JUST SELL POTATOES.<br /><span className="text-brand-red">WE DELIVER SMILES.</span></h2>
          <p className="mt-5 max-w-lg text-lg text-brand-choc/75">{VISION}</p>
          <div className="mt-8"><Button to="/story" variant="dark">Read our story →</Button></div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative grid grid-cols-5 gap-3">
            {['S', 'M', 'I', 'L', 'E'].map((l, i) => (
              <div key={l} className={`grid aspect-[3/4] place-items-center rounded-3xl font-display text-6xl font-bold shadow-card transition-transform hover:-translate-y-3 hover:rotate-3 ${['bg-brand-yellow', 'bg-brand-red text-brand-tile', 'bg-brand-orange', 'bg-brand-choc text-brand-yellow', 'bg-brand-soft'][i]}`}>{l}</div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm font-semibold text-brand-choc/60">The SMILE values that run through every store.</p>
        </Reveal>
      </div>
    </section>
  );
}
