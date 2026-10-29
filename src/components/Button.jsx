import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { track } from '../lib/analytics';
import EmojiIcon from './EmojiIcon';

const variants = {
  primary: 'bg-brand-red text-brand-tile shadow-pop hover:bg-brand-crimson',
  yellow: 'bg-brand-yellow text-brand-choc shadow-pop hover:bg-brand-orange',
  dark: 'bg-brand-choc text-brand-tile hover:bg-brand-charred',
  outline: 'border-2 border-brand-choc text-brand-choc hover:bg-brand-choc hover:text-brand-tile',
  light: 'border-2 border-brand-tile text-brand-tile hover:bg-brand-tile hover:text-brand-choc',
};
const sizes = {
  sm: 'px-4 py-2 text-xs sm:text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-8 py-4 text-base sm:text-lg',
};

// trackEvent + location => fires GA4 "franchise_cta_click" with where it was clicked.
export default function Button({
  to, href, variant = 'primary', size = 'md', trackEvent = false, location, className = '',
  children, onClick, type = 'button', disabled = false,
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50 ${variants[variant]} ${sizes[size]} ${className}`;
  const handle = (e) => {
    if (trackEvent) track('franchise_cta_click', { location });
    onClick?.(e);
  };
  let el;
  if (to) el = <Link to={to} className={cls} onClick={handle}>{children}</Link>;
  else if (href) el = <a href={href} target="_blank" rel="noreferrer" className={cls} onClick={handle}>{children}</a>;
  else el = <button type={type} disabled={disabled} className={`${cls} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`} onClick={handle}>{children}</button>;
  return (
    <motion.span whileHover={{ scale: disabled ? 1 : 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
      {el}
    </motion.span>
  );
}

export function FranchiseCTA({ location, size = 'lg', variant = 'primary', children = 'Become a Franchise Partner' }) {
  return (
    <Button to="/franchise/apply" trackEvent location={location} size={size} variant={variant}>
      <EmojiIcon emoji="🥔" className="h-4 w-7" /> {children}
    </Button>
  );
}
