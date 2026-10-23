import { motion } from 'framer-motion';

// Illustrated fry box (pure SVG) — swap for a real product photo anytime.
const FRIES = [
  { x: 95, h: 120, r: -14, d: 0 }, { x: 115, h: 150, r: -7, d: 0.2 }, { x: 138, h: 175, r: 0, d: 0.1 },
  { x: 160, h: 140, r: 6, d: 0.3 }, { x: 182, h: 165, r: 12, d: 0.15 }, { x: 125, h: 110, r: -3, d: 0.25 }, { x: 170, h: 120, r: 4, d: 0.05 },
];

export default function FryBox({ className = '' }) {
  return (
    <svg viewBox="0 0 300 360" className={className} role="img" aria-label="WOW POTATO fries box">
      <ellipse cx="150" cy="345" rx="95" ry="10" fill="rgb(var(--brand-dark))" opacity=".15" />
      {FRIES.map((f, i) => (
        <g key={i} transform={`rotate(${f.r} ${f.x + 10} 200)`}>
          <motion.rect
            x={f.x} y={200 - f.h} width="22" height={f.h} rx="7"
            fill={i % 2 ? 'rgb(var(--brand-brown-yellow))' : 'rgb(var(--brand-yellow))'} stroke="rgb(var(--brand-brown-yellow))" strokeWidth="2"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: f.d * 4, ease: 'easeInOut' }}
          />
        </g>
      ))}
      <path d="M70 185 L230 185 L214 322 Q212 336 198 336 L102 336 Q88 336 86 322 Z" fill="rgb(var(--brand-scarlet))" stroke="rgb(var(--brand-charred))" strokeWidth="4" strokeLinejoin="round" />
      <path d="M70 185 L230 185 L227 210 L73 210 Z" fill="rgb(var(--brand-crimson))" />
      <text x="150" y="262" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="44" fill="rgb(var(--brand-yellow))" stroke="rgb(var(--brand-charred))" strokeWidth="1.5">WOW</text>
      <path d="M122 288 Q150 312 178 288" fill="none" stroke="rgb(var(--brand-tile))" strokeWidth="6" strokeLinecap="round" />
      <circle cx="128" cy="280" r="4" fill="rgb(var(--brand-tile))" /><circle cx="172" cy="280" r="4" fill="rgb(var(--brand-tile))" />
    </svg>
  );
}
