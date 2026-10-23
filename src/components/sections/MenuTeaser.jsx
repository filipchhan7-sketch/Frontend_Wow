import SectionTitle from '../SectionTitle';
import ProductCard from '../ProductCard';
import Button from '../Button';
import Reveal from '../Reveal';
import { MENU } from '../../data/menu';

export default function MenuTeaser() {
  const picks = MENU.filter((m) => m.category === 'Signature Fries').slice(0, 4);
  return (
    <section className="section bg-brand-soft/60">
      <div className="container-x">
        <SectionTitle eyebrow="The menu" title="PICK YOUR WOW" sub="Long, golden and made to be shared. Choose your flavor." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((p, i) => <Reveal key={p.id} delay={i * 0.08} className="h-full"><ProductCard item={p} /></Reveal>)}
        </div>
        <div className="mt-12 text-center"><Button to="/menu" size="lg" variant="yellow">See the full menu →</Button></div>
      </div>
    </section>
  );
}
