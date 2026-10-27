import { Link } from 'react-router-dom';
import { SITE } from '../data/content';
import { Logo } from './Header';

const COLS = [
  { title: 'Company', links: [['Our Story', '/story'], ['Why WOW Potato', '/why-wow'], ['News', '/news'], ['Contact', '/contact']] },
  { title: 'Franchise', links: [['Franchise Opportunity', '/franchise'], ['International Franchise', '/international'], ['Franchise Application', '/franchise/apply']] },
  { title: 'Customer', links: [['Menu', '/menu'], ['Store Locator', '/stores'], ['Events', '/events']] },
];

export default function Footer() {
  return (
    <footer className="bg-brand-choc pt-16 text-brand-tile">
      <div className="container-x grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2"> 
          <Logo imageOnly />
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
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-yellow">Follow Us</h4>
          <ul className="space-y-2 text-sm text-brand-tile/75">
            {Object.entries(SITE.social).map(([k, v]) => (
              <li key={k}><a href={v} className="capitalize transition hover:text-brand-yellow">{k}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-tile/10 py-6">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-brand-tile/60 sm:flex-row">
          <p>© {new Date().getFullYear()} WOW POTATO. All rights reserved.</p>
          <p className="space-x-4"><Link to="/privacy" className="hover:text-brand-tile">Privacy Policy</Link><Link to="/terms" className="hover:text-brand-tile">Terms &amp; Conditions</Link></p>
        </div>
      </div>
    </footer>
  );
}
