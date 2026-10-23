import PageHeader from '../components/PageHeader';
import WhyWow from '../components/sections/WhyWow';
import Stats from '../components/sections/Stats';
import FinalCTA from '../components/sections/FinalCTA';

export default function WhyWowPage() {
  return (
    <>
      <PageHeader eyebrow="Why WOW POTATO" title={'MORE THAN FRIES.'} sub="A fun product, a friendly brand and a business built to scale." emoji="🚀" />
      <WhyWow />
      <Stats />
      <FinalCTA />
    </>
  );
}
