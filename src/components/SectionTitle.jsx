import Reveal from './Reveal';

export default function SectionTitle({ eyebrow, title, sub, center = true, light = false }) {
  return (
    <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <span className="chip">{eyebrow}</span>}
      <h2 className={`mt-3 whitespace-pre-line text-4xl font-bold leading-[1.05] sm:text-5xl ${light ? 'text-brand-tile' : ''}`}>{title}</h2>
      {sub && <p className={`mt-4 text-base sm:text-lg ${light ? 'text-brand-tile/75' : 'text-brand-choc/70'}`}>{sub}</p>}
    </Reveal>
  );
}
