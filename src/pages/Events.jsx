import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { Field } from '../components/Field';
import { EVENT_TYPES } from '../data/content';
import { submitEventBooking } from '../lib/api';
import { track } from '../lib/analytics';

const INITIAL = { name: '', email: '', phone: '', eventType: '', date: '', guests: '', message: '' };

export default function Events() {
  const [d, setD] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [ref, setRef] = useState('');
  const set = (k) => (e) => { setD((p) => ({ ...p, [k]: e.target.value })); setErrors((p) => ({ ...p, [k]: undefined })); };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!d.name.trim()) er.name = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(d.email)) er.email = 'Enter a valid email';
    if (d.phone.replace(/\D/g, '').length < 7) er.phone = 'Enter a valid phone number';
    if (!d.eventType) er.eventType = 'Choose an event type';
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    try { const r = await submitEventBooking(d); setRef(r.id); track('event_booking_submitted', { eventType: d.eventType }); setStatus('done'); }
    catch { setStatus('error'); }
  };
  const cls = (k) => `input ${errors[k] ? 'input-error' : ''}`;

  return (
    <>
      <PageHeader eyebrow="WOW POTATO events" title={'BRING THE\nWOW TO YOU'} sub="Parties, schools, companies, festivals and brand activations." emoji="🎉" />
      <section className="section">
        <div className="container-x">
          <SectionTitle eyebrow="We do events" title="WHAT CAN WE CATER?" />
          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3">
            {EVENT_TYPES.slice(0, 4).map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <motion.div whileHover={{ y: -8, rotate: -2 }} className="card text-center"><div className="text-5xl">{e.emoji}</div><h3 className="mt-3 text-lg font-bold">{e.title}</h3></motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-brand-yellow">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Book us" title="BOOK WOW POTATO FOR YOUR EVENT" />
          <div className="card mt-10 p-6 sm:p-10">
            {status === 'done' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                <div className="text-6xl">🎉</div><h3 className="mt-3 text-3xl font-bold">Request received!</h3>
                <p className="mt-2 text-brand-choc/70">We’ll get back to you shortly. Reference: <b className="font-mono">{ref}</b></p>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" required error={errors.name}><input className={cls('name')} value={d.name} onChange={set('name')} /></Field>
                <Field label="Email" required error={errors.email}><input type="email" className={cls('email')} value={d.email} onChange={set('email')} /></Field>
                <Field label="Phone" required error={errors.phone}><input type="tel" className={cls('phone')} value={d.phone} onChange={set('phone')} /></Field>
                <Field label="Event type" required error={errors.eventType}>
                  <select className={cls('eventType')} value={d.eventType} onChange={set('eventType')}><option value="">Select…</option>{EVENT_TYPES.map((t) => <option key={t.title}>{t.title}</option>)}</select>
                </Field>
                <Field label="Event date"><input type="date" className="input" value={d.date} onChange={set('date')} /></Field>
                <Field label="Number of guests"><input type="number" min="1" className="input" value={d.guests} onChange={set('guests')} /></Field>
                <Field label="Tell us more" className="sm:col-span-2"><textarea rows={3} className="input" value={d.message} onChange={set('message')} /></Field>
                {status === 'error' && <p role="alert" className="text-sm font-semibold text-brand-red sm:col-span-2">Something went wrong. Please try again.</p>}
                <div className="sm:col-span-2"><Button type="submit" size="lg" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send booking request'}</Button></div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
