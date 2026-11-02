import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { Field } from '../components/Field';
import { PhoneInput, CountrySelect } from '../components/CountryPacker';
import { submitLead } from '../lib/api';
import { track } from '../lib/analytics';

const INITIAL = {
  territoryCountry: '', firstName: '', lastName: '', personalAddress: '',
  email: '', phone: '',
};
const DRAFT_KEY = 'wp_franchise_application_draft';

function readDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    const previousData = saved?.data && typeof saved.data === 'object' ? saved.data : saved;
    if (!previousData) return INITIAL;
    const draft = { ...INITIAL };
    Object.keys(INITIAL).forEach((key) => {
      if (typeof previousData[key] === typeof INITIAL[key]) draft[key] = previousData[key];
    });
    if (draft.phone && !draft.phone.startsWith('+') && previousData.phoneCode) {
      const phoneCode = String(previousData.phoneCode).match(/\+(?:\d+)?/)?.[0];
      if (phoneCode) draft.phone = `${phoneCode} ${draft.phone}`;
    }
    if (!draft.firstName && previousData.fullName) {
      const [firstName, ...lastName] = previousData.fullName.trim().split(/\s+/);
      draft.firstName = firstName || '';
      draft.lastName = lastName.join(' ');
    }
    try { localStorage.removeItem(`${DRAFT_KEY}_step`); } catch {}
    return draft;
  } catch { return INITIAL; }
}

export default function Apply() {
  const [d, setD] = useState(readDraft);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [leadId, setLeadId] = useState('');
  const started = useRef(false);

  const set = (key) => (value) => {
    if (!started.current) { started.current = true; track('application_started'); }
    setD((previous) => {
      const next = { ...previous, [key]: value };
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const input = (key, props = {}) => (
    <input
      className={`input ${errors[key] ? 'input-error' : ''}`}
      value={d[key]}
      onChange={(event) => set(key)(event.target.value)}
      {...props}
    />
  );

  const pickCountry = (country) => set('territoryCountry')(country.name);

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    ['territoryCountry', 'firstName', 'lastName', 'personalAddress', 'email', 'phone'].forEach((key) => {
      if (!String(d[key]).trim()) nextErrors[key] = 'Required';
    });
    if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) nextErrors.email = 'Enter a valid email';
    if (d.phone && d.phone.replace(/\D/g, '').length < 7) nextErrors.phone = 'Enter a valid phone number';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    track('application_step_completed', { step: 1, step_name: 'Franchise inquiry' });
    setStatus('sending');
    try {
      const fullName = `${d.firstName.trim()} ${d.lastName.trim()}`;
      const res = await submitLead({
        ...d,
        fullName,
        country: d.territoryCountry,
      });
      setLeadId(res.id);
      try { localStorage.removeItem(DRAFT_KEY); localStorage.removeItem(`${DRAFT_KEY}_step`); } catch {}
      track('application_submitted', { country: d.territoryCountry });
      setStatus('done');
    } catch { setStatus('error'); }
  };

  if (status === 'done') {
    return (
      <>
        <PageHeader eyebrow="Franchise inquiry" title="LET’S TALK FRANCHISE" emoji="🎉" />
        <section className="section">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card mx-auto max-w-xl text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-500 text-4xl text-white">✓</div>
            <h2 className="mt-6 text-3xl font-bold">Thanks, {d.firstName || d.fullName?.split(' ')[0]}!</h2>
            <p className="mt-3 text-brand-choc/75">Your inquiry is in. Our franchise team will get in touch to arrange a conversation.</p>
            <p className="mt-5 rounded-2xl bg-brand-soft p-4 text-sm">Reference: <b className="font-mono">{leadId}</b></p>
            <div className="mt-8"><Button to="/" variant="dark">Back to home</Button></div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Franchise inquiry" title={'LET’S TALK\nFRANCHISE'} sub="Share a few details and our team will get in touch." emoji="📝" />
      <section className="section">
        <div className="container-x max-w-3xl">
          <form onSubmit={submit} noValidate className="card space-y-7 p-6 sm:p-10">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Franchise inquiry</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="block sm:col-span-2">
                <label htmlFor="franchise-country-interest" className="mb-1.5 block text-sm font-bold">Country of Interest<span className="text-brand-red"> *</span></label>
                <CountrySelect id="franchise-country-interest" value={d.territoryCountry} onPick={pickCountry} error={!!errors.territoryCountry} />
                {errors.territoryCountry && <span role="alert" className="mt-1 block text-xs font-semibold text-brand-red">{errors.territoryCountry}</span>}
              </div>

              <Field label="First Name" required error={errors.firstName}>
                {input('firstName', { autoComplete: 'given-name', placeholder: 'First name' })}
              </Field>
              <Field label="Last Name" required error={errors.lastName}>
                {input('lastName', { autoComplete: 'family-name', placeholder: 'Last name' })}
              </Field>
              <Field label="Personal Address" required error={errors.personalAddress} className="sm:col-span-2">
                <textarea className={`input min-h-24 resize-y ${errors.personalAddress ? 'input-error' : ''}`} value={d.personalAddress} onChange={(event) => set('personalAddress')(event.target.value)} autoComplete="street-address" placeholder="Street, city, postal code" rows={3} />
              </Field>

              <div className="sm:col-span-2">
                <label htmlFor="franchise-phone" className="mb-1.5 block text-sm font-bold">Phone Number<span className="text-brand-red"> *</span></label>
                <PhoneInput id="franchise-phone" value={d.phone} onChange={set('phone')} error={!!errors.phone} />
                {errors.phone && <span role="alert" className="mt-1 block text-xs font-semibold text-brand-red">{errors.phone}</span>}
              </div>

              <Field label="Email Address" required error={errors.email} className="sm:col-span-2">
                {input('email', { type: 'email', inputMode: 'email', autoComplete: 'email', placeholder: 'you@example.com' })}
              </Field>
            </div>

            <div className="border-t border-brand-choc/10 pt-5">
              {status === 'error' && <p role="alert" className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-brand-red">Something went wrong. Please try again.</p>}
            </div>

            <div className="flex flex-col-reverse items-stretch gap-3 border-t border-brand-choc/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-brand-choc/60">* Required fields</p>
              <Button type="submit" disabled={status === 'sending'} size="lg">
                {status === 'sending' ? 'Sending…' : 'Send inquiry →'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
