import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import SectionTitle from '../SectionTitle';
import Reveal from '../Reveal';
import { STATS } from '../../data/content';

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (l) => setV(Math.round(l)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="section bg-brand-choc text-brand-tile">
      <div className="container-x">
        <SectionTitle light eyebrow="Our business today" title="FROM ONE POTATO IDEA TO A GROWING BRAND" sub="Real stores. Real customers. A concept tested in the real market." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <div className={`h-full rounded-3xl p-6 text-center ${s.approved ? 'bg-brand-tile/10' : 'border-2 border-dashed border-brand-tile/25'}`}>
                <p className="font-display text-5xl font-bold text-brand-yellow sm:text-6xl">
                  {!s.approved ? 'XXX' : typeof s.value === 'number' ? <Counter to={s.value} suffix={s.suffix} /> : s.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-brand-tile/80">{s.label}</p>
                {!s.approved && <p className="mt-2 text-[11px] uppercase tracking-wider text-brand-tile/40">Figure pending approval</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
