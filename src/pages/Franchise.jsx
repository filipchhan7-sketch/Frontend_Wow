import PageHeader from '../components/PageHeader';
import Button, { FranchiseCTA } from '../components/Button';
import ImageCarousel from '../components/ImageCarousel';

export default function Franchise() {
  return (
    // if you want add like headline on Bring ... ad in PageHeader only use this eyebrow="Franchise opportunity" 
    <>
      <PageHeader title={'BRING WOW POTATO\nTO YOUR CITY'} sub="Explore a franchise partnership with a memorable fries brand." heroBackground="/images/A3%20Light.png">
        <FranchiseCTA location="franchise_hero">Become a Franchise Partner →</FranchiseCTA>
      </PageHeader>

      <section className="section !px-0">
        <div className="container-x">
          {/* <p className="mx-auto max-w-2xl text-center text-lg text-brand-choc/75">A distinctive long-fries product, a family-friendly brand and a partner-focused opportunity to grow in your market.</p> */}
        </div>
        <div className="mt-10 sm:mt-12">
          <ImageCarousel />
        </div>
      </section>

      <section className="section bg-brand-soft/60">
        <div className="container-x mx-auto max-w-3xl text-center">
          <p className="chip">Partner support</p>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">START WITH A CONVERSATION</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-choc/75">We’ll discuss your market, goals and the right next steps for a WOW POTATO partnership.</p>
          <div className="mt-7"><Button to="/franchise/apply" size="lg">Become a Franchise Partner →</Button></div>
        </div>
      </section>

    </>
  );
}
