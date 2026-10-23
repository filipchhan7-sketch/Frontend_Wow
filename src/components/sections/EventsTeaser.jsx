import { motion } from 'framer-motion';
import SectionTitle from '../SectionTitle';
import Button from '../Button';
import { EVENT_TYPES } from '../../data/content';

export default function EventsTeaser() {
  return (
    <section className="section bg-brand-yellow">
      <div className="container-x">
        <SectionTitle eyebrow="WOW POTATO events" title="BRING THE WOW TO YOUR PARTY" />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {EVENT_TYPES.map((e, i) => (
            <motion.div key={e.title} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, type: 'spring' }}
              whileHover={{ rotate: -3, y: -6 }} className="rounded-3xl bg-brand-tile p-5 text-center shadow-card">
              <div className="text-4xl">{e.emoji}</div><p className="mt-2 text-sm font-bold">{e.title}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center"><Button to="/events" variant="dark" size="lg">Book WOW POTATO for your event</Button></div>
      </div>
    </section>
  );
}
