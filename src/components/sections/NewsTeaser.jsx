import SectionTitle from '../SectionTitle';
import NewsCard from '../NewsCard';
import Button from '../Button';
import { NEWS } from '../../data/news';

export default function NewsTeaser() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionTitle eyebrow="News & media" title="WHAT’S NEW AT WOW" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">{NEWS.slice(0, 3).map((p) => <NewsCard key={p.slug} post={p} />)}</div>
        <div className="mt-10 text-center"><Button to="/news" variant="outline">All news →</Button></div>
      </div>
    </section>
  );
}
