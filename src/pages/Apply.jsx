import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { Field, OptionGroup } from '../components/Field';
import { INVESTMENT_RANGES, STORE_COUNTS } from '../data/content';
import { submitLead } from '../lib/api';
import { track } from '../lib/analytics';

const STEPS = [
  { name: 'About you', emoji: '👋' }, { name: 'Business profile', emoji: '💼' }, { name: 'Investment', emoji: '💰' },
  { name: 'Territory', emoji: '🗺️' }, { name: 'Development plan', emoji: '🚀' },
];

const INITIAL = {
  fullName: '', company: '', position: '', email: '', phone: '', country: '', city: '',
  currentBusiness: '', fbExperience: '', existingStores: '', yearsInBusiness: '',
  investment: '', territoryCountry: '', territoryCity: '', stores: '', message: '', consent: false,
};
const DRAFT_KEY = 'wp_franchise_application_draft';

function loadDraft() {
  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (!saved) return { data: INITIAL, step: 0, restored: false, error: '' };

    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed.data !== 'object' || parsed.data === null || Array.isArray(parsed.data)) {
      throw new Error('Invalid application draft');
    }

    const data = { ...INITIAL };
    Object.keys(INITIAL).forEach((key) => {
      if (typeof parsed.data[key] === typeof INITIAL[key]) data[key] = parsed.data[key];
    });
    const step = Number.isInteger(parsed.step) ? Math.min(Math.max(parsed.step, 0), STEPS.length - 1) : 0;
    return { data, step, restored: true, error: '' };
  } catch {
    return {
      data: INITIAL,
      step: 0,
      restored: false,
      error: 'We could not restore your saved application draft. Your new answers will still be saved automatically.',
    };
  }
}

function validate(step, d) {
  const e = {};
  const req = (k, msg = 'Required') => { if (!String(d[k]).trim()) e[k] = msg; };
  if (step === 0) {
    ['fullName', 'email', 'phone', 'country', 'city'].forEach((k) => req(k));
    if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Enter a valid email';
    if (d.phone && d.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number';
  }
  if (step === 1) { req('currentBusiness', 'Tell us about your current business'); req('fbExperience', 'Please choose one'); }
  if (step === 2) req('investment', 'Please choose a range');
  if (step === 3) req('territoryCountry', 'Which country are you interested in?');
  if (step === 4) { req('stores', 'Please choose one'); if (!d.consent) e.consent = 'Please agree so we can contact you'; }
  return e;
}

const slide = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function Apply() {
  const [initialDraft] = useState(loadDraft);
  const [step, setStep] = useState(initialDraft.step);
  const [dir, setDir] = useState(1);
  const [d, setD] = useState(initialDraft.data);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [leadId, setLeadId] = useState('');
  const [draftError, setDraftError] = useState(initialDraft.error);
  const started = useRef(false);
  const draftExists = useRef(initialDraft.restored);

  useEffect(() => {
    const hasProgress = step > 0 || Object.values(d).some((value) => (typeof value === 'boolean' ? value : Boolean(value)));
    try {
      if (status === 'done') {
        localStorage.removeItem(DRAFT_KEY);
        draftExists.current = false;
      } else if (hasProgress) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ data: d, step }));
        draftExists.current = true;
      } else if (draftExists.current) {
        localStorage.removeItem(DRAFT_KEY);
        draftExists.current = false;
      } else {
        return;
      }
      setDraftError('');
    } catch {
      setDraftError('Your application could not be saved in this browser. Please keep this page open until you submit.');
    }
  }, [d, step, status]);

  const set = (k) => (v) => {
    if (!started.current) { started.current = true; track('application_started'); }
    setD((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };
  const input = (k, props = {}) => (
    <input className={`input ${errors[k] ? 'input-error' : ''}`} value={d[k]} onChange={(e) => set(k)(e.target.value)} {...props} />
  );

  const next = async () => {
    const e = validate(step, d);
    setErrors(e);
    if (Object.keys(e).length) return;
    track('application_step_completed', { step: step + 1, step_name: STEPS[step].name });
    if (step < STEPS.length - 1) { setDir(1); setStep(step + 1); return; }
    setStatus('sending');
    try {
      const res = await submitLead(d);
      setLeadId(res.id);
      track('application_submitted', { investment: d.investment, stores: d.stores, country: d.territoryCountry });
      setStatus('done');
    } catch { setStatus('error'); }
  };
  const back = () => { setDir(-1); setStep(Math.max(0, step - 1)); setErrors({}); };

  if (status === 'done') {
    return (
      <>
        <PageHeader eyebrow="Franchise application" title="YOU’RE IN THE QUEUE!" emoji="🎉" />
        <section className="section">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card mx-auto max-w-xl text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand-yellow text-5xl text-brand-choc">✓</motion.div>
            <h2 className="mt-6 text-3xl font-bold">Thank you, {d.fullName.split(' ')[0]}!</h2>
            <p className="mt-3 text-brand-choc/75">Our franchise development team will review your information and contact qualified applicants.</p>
            <p className="mt-5 rounded-2xl bg-brand-soft p-4 text-sm">Your reference: <b className="font-mono">{leadId}</b></p>
            {draftError && <p role="alert" className="mt-4 text-sm font-semibold text-brand-red">{draftError}</p>}
            <div className="mt-8 flex flex-wrap justify-center gap-3"><Button to="/" variant="dark">Back to home</Button><Button to="/menu" variant="outline">Explore the menu</Button></div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Franchise application" title={'START YOUR\nFRANCHISE JOURNEY'} sub="Five quick steps. No exact wealth figures required." emoji="📝" />
      <section className="section">
        <div className="container-x max-w-3xl">
          {draftError && <p role="alert" className="mb-4 rounded-2xl bg-brand-red/10 p-3 text-sm font-semibold text-brand-red">{draftError}</p>}
          {!draftError && initialDraft.restored && <p role="status" className="mb-4 rounded-2xl bg-brand-soft p-3 text-sm">Your saved application draft was restored.</p>}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Step {step + 1} of {STEPS.length}</span><span>{STEPS[step].emoji} {STEPS[step].name}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-brand-choc/10" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
              <motion.div className="h-full rounded-full bg-gradient-to-r from-brand-yellow to-brand-red" animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
            </div>
            <div className="mt-3 hidden justify-between sm:flex">
              {STEPS.map((s, i) => <span key={s.name} className={`grid h-9 w-9 place-items-center rounded-full text-sm transition ${i <= step ? 'bg-brand-choc text-brand-tile' : 'bg-brand-tile text-brand-choc/40'}`}>{i < step ? '✓' : i + 1}</span>)}
            </div>
          </div>

          <div className="card overflow-hidden p-6 sm:p-10">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="space-y-5">
                {step === 0 && (<>
                  <h2 className="text-3xl font-bold">Tell us about you</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" required error={errors.fullName}>{input('fullName', { autoComplete: 'name', placeholder: 'Your name' })}</Field>
                    <Field label="Company" error={errors.company}>{input('company', { placeholder: 'Company (optional)' })}</Field>
                    <Field label="Position" error={errors.position}>{input('position', { placeholder: 'e.g. Owner, Director' })}</Field>
                    <Field label="Email" required error={errors.email}>{input('email', { type: 'email', autoComplete: 'email', placeholder: 'you@company.com' })}</Field>
                    <Field label="Phone / WhatsApp" required error={errors.phone}>{input('phone', { type: 'tel', autoComplete: 'tel', placeholder: '+855 …' })}</Field>
                    <Field label="Country" required error={errors.country}>{input('country', { autoComplete: 'country-name', placeholder: 'Country' })}</Field>
                    <Field label="City" required error={errors.city}>{input('city', { placeholder: 'City' })}</Field>
                  </div>
                </>)}
                {step === 1 && (<>
                  <h2 className="text-3xl font-bold">Your business profile</h2>
                  <Field label="Current business" required error={errors.currentBusiness}>{input('currentBusiness', { placeholder: 'What do you do today?' })}</Field>
                  <Field label="Do you have F&B experience?" required error={errors.fbExperience}>
                    <OptionGroup name="fb" options={['Yes', 'No']} value={d.fbExperience} onChange={set('fbExperience')} />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Number of existing stores">{input('existingStores', { type: 'number', min: 0, placeholder: '0' })}</Field>
                    <Field label="Years in business">{input('yearsInBusiness', { type: 'number', min: 0, placeholder: '0' })}</Field>
                  </div>
                </>)}
                {step === 2 && (<>
                  <h2 className="text-3xl font-bold">Estimated investment range</h2>
                  <p className="text-sm text-brand-choc/60">A rough range is perfect — no exact figures needed.</p>
                  <OptionGroup name="inv" options={INVESTMENT_RANGES} value={d.investment} onChange={set('investment')} error={errors.investment} cols="sm:grid-cols-3" />
                </>)}
                {step === 3 && (<>
                  <h2 className="text-3xl font-bold">Where do you want WOW?</h2>
                  <Field label="Country" required error={errors.territoryCountry}>{input('territoryCountry', { placeholder: 'Country of interest' })}</Field>
                  <Field label="City / area">{input('territoryCity', { placeholder: 'City or region (optional)' })}</Field>
                </>)}
                {step === 4 && (<>
                  <h2 className="text-3xl font-bold">Your development plan</h2>
                  <Field label="How many WOW POTATO stores would you like to develop?" required error={errors.stores}>
                    <OptionGroup name="stores" options={STORE_COUNTS} value={d.stores} onChange={set('stores')} cols="grid-cols-2 sm:grid-cols-4" />
                  </Field>
                  <Field label="Anything else we should know?">
                    <textarea rows={3} className="input" value={d.message} onChange={(e) => set('message')(e.target.value)} placeholder="Optional" />
                  </Field>
                  <label className="flex cursor-pointer items-start gap-3 text-sm">
                    <input type="checkbox" checked={d.consent} onChange={(e) => set('consent')(e.target.checked)} className="mt-1 h-5 w-5 accent-brand-red" />
                    <span>I agree to be contacted about WOW POTATO franchise opportunities. See our <Link to="/privacy" className="underline">Privacy Policy</Link>.</span>
                  </label>
                  {errors.consent && <p role="alert" className="text-xs font-semibold text-brand-red">{errors.consent}</p>}
                  {status === 'error' && <p role="alert" className="rounded-2xl bg-brand-red/10 p-3 text-sm font-semibold text-brand-red">Something went wrong. Please try again.</p>}
                </>)}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between">
              <Button variant="outline" onClick={back} disabled={step === 0}>← Back</Button>
              <Button onClick={next} disabled={status === 'sending'} size="lg">
                {status === 'sending' ? 'Sending…' : step === STEPS.length - 1 ? 'Submit franchise inquiry' : 'Continue →'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
