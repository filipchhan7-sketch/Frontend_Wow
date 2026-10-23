import SectionTitle from '../SectionTitle';
import FeatureCard from '../FeatureCard';
import { WHY_WOW } from '../../data/content';

export default function WhyWow() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Why WOW POTATO?" title={'MORE THAN FRIES.\nA BUSINESS BUILT TO GROW.'} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_WOW.map((w, i) => <FeatureCard key={w.title} {...w} delay={i * 0.07} />)}
        </div>
      </div>
    </section>
  );
}
