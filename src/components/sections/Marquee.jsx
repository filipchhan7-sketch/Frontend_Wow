import { MARQUEE } from '../../data/content';

export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden bg-brand-choc py-4 text-brand-yellow" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl font-bold uppercase">
        {items.concat(items).map((t, i) => <span key={i} className="flex items-center gap-10">{t} <span className="text-brand-red">★</span></span>)}
      </div>
    </div>
  );
}
