import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { FranchiseCTA } from '../components/Button';
import { SITE } from '../data/content';

export default function Contact() {
  const rows = [['📞', 'Phone', SITE.phone, `tel:${SITE.phone.replace(/\s/g, '')}`], ['✉️', 'Email', SITE.email, `mailto:${SITE.email}`], ['📍', 'Address', SITE.address, null]];
  return (
    <>
      <PageHeader eyebrow="Contact" title={'LET’S CREATE\nSOMETHING WOW'} sub="General questions? We’d love to hear from you." emoji="💬" />
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full">
              <h2 className="text-3xl font-bold">General inquiries</h2>
              <div className="mt-6 space-y-5">
                {rows.map(([e, l, v, h]) => (
                  <div key={l} className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-yellow text-2xl">{e}</span>
                    <div><p className="text-xs font-bold uppercase text-brand-choc/50">{l}</p>{h ? <a href={h} className="font-semibold hover:text-brand-red">{v}</a> : <p className="font-semibold">{v}</p>}</div></div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-2">{Object.entries(SITE.social).map(([k, v]) => <a key={k} href={v} className="rounded-full bg-brand-choc px-4 py-2 text-sm font-bold capitalize text-brand-tile transition hover:bg-brand-red">{k}</a>)}</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full bg-brand-red text-brand-tile">
              <span className="text-5xl">🥔</span>
              <h2 className="mt-4 text-3xl font-bold">Franchise inquiry</h2>
              <p className="mt-3 text-brand-tile/85">Interested in building WOW POTATO in your city or country? Franchise inquiries have their own fast lane.</p>
              <div className="mt-8"><FranchiseCTA location="contact" variant="yellow">Become a Franchise Partner →</FranchiseCTA></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
