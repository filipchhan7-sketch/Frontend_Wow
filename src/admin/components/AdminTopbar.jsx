import AdminIcon from './AdminIcon';

export default function AdminTopbar({ title, onOpenMenu, onNotify }) {
  return <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-brand-choc/10 bg-brand-cream/95 px-4 backdrop-blur-sm sm:px-7">
    <button type="button" onClick={onOpenMenu} aria-label="Open admin navigation" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-choc/10 bg-white text-brand-choc hover:bg-brand-yellow/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/40 lg:hidden"><AdminIcon name="menu" /></button>
    <h1 className="font-display text-xl font-semibold text-brand-choc sm:text-2xl">{title}</h1>
    <label className="ml-auto hidden w-full max-w-[280px] items-center gap-2 rounded-xl border border-brand-choc/10 bg-white px-3 text-brand-choc/50 focus-within:border-brand-orange md:flex">
      <AdminIcon name="search" className="h-4 w-4" /><span className="sr-only">Search dashboard</span><input type="search" placeholder="Search anything" className="w-full bg-transparent py-2.5 text-sm text-brand-choc outline-none placeholder:text-brand-choc/40" />
    </label>
    <button type="button" onClick={onNotify} aria-label="Show notifications" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-choc/10 bg-white text-brand-choc hover:bg-brand-yellow/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/40">
      <AdminIcon name="bell" className="h-[18px] w-[18px]" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-brand-red" />
    </button>
  </header>;
}
