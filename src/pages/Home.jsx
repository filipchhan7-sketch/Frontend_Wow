import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
import MenuTeaser from '../components/sections/MenuTeaser';
import Button from '../components/Button';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <MenuTeaser />
      <section className="bg-brand-soft/60 py-8 sm:py-10" aria-label="Store locator">
        <div className="container-x flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl font-bold text-brand-choc sm:text-3xl">Craving WOW POTATO?</p>
            <p className="mt-1 text-base text-brand-choc/80 sm:text-lg">Find a store near you.</p>
          </div>
          <Button to="/stores" variant="dark">Find a store →</Button>
        </div>
      </section>
    </>
  );
}
