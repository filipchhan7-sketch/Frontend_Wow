import { Link } from 'react-router-dom';
import { SITE } from '../data/content';
import { Logo } from './Header';

const COLS = [
  { title: 'Company', links: [['Our Story', '/story'], ['Why WOW Potato', '/why-wow'], ['News', '/news'], ['Contact', '/contact']] },
  { title: 'Franchise', links: [['Franchise Opportunity', '/franchise'], ['International Franchise', '/international'], ['Franchise Application', '/franchise/apply']] },
  { title: 'Customer', links: [['Menu', '/menu'], ['Store Locator', '/stores'], ['Events', '/events']] },
];

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-5 w-5',
  'aria-hidden': true,
};

// keys must match the keys in SITE.social (lowercase)
const ICONS = {
  facebook: (
    <svg {...svgProps}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (
    <svg {...svgProps}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  tiktok: (
    <svg {...svgProps}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
  youtube: (
    <svg {...svgProps}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  ),
};

export default function Footer() {
  const socials = Object.entries(SITE.social).filter(([, url]) => url && url !== '#');

  return (
    <footer className="bg-brand-choc pt-16 text-brand-tile">
      <div className="container-x grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="inline-flex rounded-2xl bg-brand-tile p-2 shadow-card">
            <Logo imageOnly />
          </div>
          <p className="mt-4 font-display text-2xl font-semibold text-brand-yellow">The Longest Fries.<br />The Biggest Smiles.</p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-yellow">{c.title}</h4>
            <ul className="space-y-2 text-sm text-brand-tile/75">
              {c.links.map(([label, to]) => (
                <li key={to}><Link to={to} className="transition hover:text-brand-yellow">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Centered social row */}
      <div className="border-t border-brand-tile/10 py-10">
        <div className="container-x flex flex-col items-center gap-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-yellow">Follow Us</h4>
          <ul className="flex items-center gap-4">
            {socials.map(([k, v]) => (
              <li key={k}>
                <a
                  href={v}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={k}
                  title={k}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-tile/25 text-brand-tile/80 transition hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-choc"
                >
                  {ICONS[k.toLowerCase()] ?? <span className="text-xs font-bold uppercase">{k.slice(0, 2)}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-tile/10 py-6">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-brand-tile/60 sm:flex-row">
          <p>© {new Date().getFullYear()} WOW POTATO. All rights reserved.</p>
          <p className="space-x-4"><Link to="/privacy" className="hover:text-brand-tile">Privacy Policy</Link><Link to="/terms" className="hover:text-brand-tile">Terms &amp; Conditions</Link>
          <Link to="/login" className="hover:text-white">Staff login</Link></p>
        </div>
      </div>
    </footer>
  );
}
