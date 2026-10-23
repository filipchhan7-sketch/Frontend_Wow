// Shared form bits: labelled field + radio "pill" group.
export function Field({ label, error, required, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-bold">{label}{required && <span className="text-brand-red"> *</span>}</span>
      {children}
      {error && <span role="alert" className="mt-1 block text-xs font-semibold text-brand-red">{error}</span>}
    </label>
  );
}

export function OptionGroup({ name, options, value, onChange, error, cols = 'sm:grid-cols-2' }) {
  return (
    <div>
      <div className={`grid gap-3 ${cols}`} role="radiogroup">
        {options.map((o) => (
          <label key={o} className={`cursor-pointer rounded-2xl border-2 px-4 py-3 text-center text-sm font-bold transition ${value === o ? 'border-brand-choc bg-brand-yellow shadow-pop' : 'border-brand-choc/10 bg-brand-tile hover:border-brand-orange'}`}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
      {error && <span role="alert" className="mt-2 block text-xs font-semibold text-brand-red">{error}</span>}
    </div>
  );
}
