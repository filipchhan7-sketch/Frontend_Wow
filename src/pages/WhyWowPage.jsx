import PageHeader from '../components/PageHeader';
import WhyWow from '../components/sections/WhyWow';
import FinalCTA from '../components/sections/FinalCTA';

export default function WhyWowPage() {
  return (
    <>
      <PageHeader eyebrow="Why WOW POTATO" title="MORE THAN FRIES." sub="A fun, extra-long fries experience made to share." emoji="🚀" />
      <WhyWow />
      <FinalCTA />
    </>
  );
}
