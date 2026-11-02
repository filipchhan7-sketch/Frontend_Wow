import { MARQUEE } from '../../data/content';

export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden bg-brand-choc py-3.5 text-brand-yellow motion-reduce:overflow-x-auto sm:py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-xl font-bold uppercase motion-reduce:animate-none sm:text-2xl">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-10">
            {t}<span aria-hidden="true" className="text-brand-red">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
