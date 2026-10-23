import { motion } from 'framer-motion';

// Fade + slide up when scrolled into view.
export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
