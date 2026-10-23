import { Link } from 'react-router-dom';
import SectionTitle from '../SectionTitle';
import Reveal from '../Reveal';
import Button from '../Button';
import { STORES } from '../../data/stores';

export default function StoresTeaser() {
  return (
    <section className="section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle center={false} eyebrow="Our stores" title="FIND YOUR WOW" sub="Visit us at a mall near you." />
          <div className="mt-8"><Button to="/stores" variant="dark">Find a WOW POTATO →</Button></div>
        </div>
        <div className="space-y-4">
          {STORES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.1}>
              <Link to="/stores" className="card flex items-center gap-4 transition hover:-translate-y-1">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-red text-2xl">📍</span>
                <div><p className="font-display text-lg font-bold">{s.mall}</p><p className="text-sm text-brand-choc/60">{s.city} · {s.hours}</p></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
