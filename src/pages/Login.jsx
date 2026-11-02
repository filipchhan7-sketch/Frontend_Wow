import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SITE } from '../data/content';
import { login, DEMO_MODE, DEMO_HINT } from '../lib/auth';

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 8 9 6 9-6" /></svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
);
const EyeIcon = ({ off }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{off && <path d="M4 4l16 16" />}
  </svg>
);

const BADGES = [
  { e: '😊', cls: 'left-[12%] top-[14%]', d: 0 },
  { e: '🧀', cls: 'right-[12%] top-[22%]', d: 0.6 },
  { e: '🌶️', cls: 'left-[10%] bottom-[18%]', d: 1.1 },
  { e: '✨', cls: 'right-[16%] bottom-[12%]', d: 0.3 },
];

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState(null);
  const [shake, setShake] = useState(0);

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
    setFormError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Enter a valid email';
    if (!form.password) er.password = 'Enter your password';
    setErrors(er);
    if (Object.keys(er).length) { setShake((s) => s + 1); return; }

    setLoading(true);
    try {
      const data = await login(form);
      setWelcome(data.name || 'back');
      setTimeout(() => navigate(redirectTo, { replace: true }), 1100);
    } catch (err) {
      setFormError(err.message || 'Login failed.');
      setShake((s) => s + 1);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (k) => `input !pl-12 ${errors[k] ? 'input-error' : ''}`;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel (desktop only) */}
      <aside className="relative hidden overflow-hidden bg-brand-yellow lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/50 blur-3xl" />
        {BADGES.map((b) => (
          <motion.span key={b.e} aria-hidden className={`absolute grid h-14 w-14 place-items-center rounded-full bg-white text-3xl shadow-card ${b.cls}`}
            animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: b.d }}>{b.e}</motion.span>
        ))}
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 70 }} className="relative w-full max-w-xs">
          <div className="absolute inset-4 rounded-full bg-white/50" />
          <img src="/images/hana-na.png" alt="WOW Potato mascot" className="relative w-full animate-float object-contain drop-shadow-2xl" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative mt-8 max-w-sm text-center">
          <h2 className="text-5xl font-bold leading-[0.95]">WELCOME BACK<br /><span className="text-brand-red">TO WOW!</span></h2>
          <p className="mt-4 font-medium text-brand-choc/75">Sign in to manage franchise leads, event bookings and your menu.</p>
        </motion.div>
      </aside>

      {/* Right: form */}
      <section className="flex items-center justify-center px-5 pb-16 pt-28 sm:px-10">
        <motion.div key={shake} animate={shake ? { x: [0, -12, 12, -8, 8, 0] } : {}} transition={{ duration: 0.4 }} className="w-full max-w-md">
          <div className="card p-7 sm:p-10">
            <AnimatePresence mode="wait">
              {welcome ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-500 text-4xl text-white">✓</motion.div>
                  <h2 className="mt-5 text-3xl font-bold">Welcome, {welcome}!</h2>
                  <p className="mt-2 text-sm text-brand-choc/60">Taking you in…</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
                  <div>
                    <span className="chip">Staff login</span>
                    <h1 className="mt-3 text-4xl font-bold leading-none">Sign in</h1>
                    <p className="mt-2 text-sm text-brand-choc/60">Enter your details to continue.</p>
                  </div>

                  {DEMO_MODE && (
                    <p className="rounded-2xl bg-brand-soft p-3 text-xs font-semibold">Demo mode (no backend connected). Use <b className="font-mono">{DEMO_HINT}</b></p>
                  )}

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-bold">Email</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-choc/40"><MailIcon /></span>
                      <input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set('email')} className={inputCls('email')} />
                    </div>
                    {errors.email && <p role="alert" className="mt-1 text-xs font-semibold text-brand-red">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-1.5 block text-sm font-bold">Password</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-choc/40"><LockIcon /></span>
                      <input id="password" type={show ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••" value={form.password} onChange={set('password')} className={`${inputCls('password')} !pr-12`} />
                      <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-brand-choc/50 transition hover:bg-brand-yellow/40 hover:text-brand-choc">
                        <EyeIcon off={show} />
                      </button>
                    </div>
                    {errors.password && <p role="alert" className="mt-1 text-xs font-semibold text-brand-red">{errors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex cursor-pointer items-center gap-2 font-medium">
                      <input type="checkbox" checked={form.remember} onChange={set('remember')} className="h-4 w-4 accent-brand-red" /> Remember me
                    </label>
                    <a href={`mailto:${SITE.email}?subject=Password%20reset`} className="font-bold text-brand-red hover:underline">Forgot password?</a>
                  </div>

                  <AnimatePresence>
                    {formError && (
                      <motion.p role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-brand-red">⚠️ {formError}</motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-red py-3.5 text-base font-bold text-white shadow-pop transition-colors hover:bg-[#d02420] disabled:opacity-70">
                    {loading ? (
                      <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: 'linear', duration: 0.8 }} className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white" />Signing in…</>
                    ) : (<>Sign in →</>)}
                  </motion.button>

                  <p className="text-center text-sm text-brand-choc/60">Want to become a franchise partner? <Link to="/franchise/apply" className="font-bold text-brand-red hover:underline">Apply here</Link></p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </div>
  );
}