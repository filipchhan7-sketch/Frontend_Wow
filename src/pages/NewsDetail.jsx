import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import NewsCard, { fmtDate } from '../components/NewsCard';
import Button from '../components/Button';
import NotFound from './NotFound';
import { NEWS } from '../data/news';

export default function NewsDetail() {
  const { slug } = useParams();
  const post = NEWS.find((n) => n.slug === slug);
  if (!post) return <NotFound />;
  const more = NEWS.filter((n) => n.slug !== slug).slice(0, 3);
  return (
    <>
      <PageHeader eyebrow={`${post.category} · ${fmtDate(post.date)}`} title={post.title} emoji={post.emoji} />
      <article className="section">
        <div className="container-x max-w-2xl space-y-5 text-lg leading-relaxed text-brand-choc/85">
          {post.body.map((p, i) => <p key={i}>{p}</p>)}
          <div className="pt-4"><Link to="/news" className="font-bold text-brand-red">← Back to news</Link></div>
        </div>
      </article>
      <section className="bg-brand-soft/60 pb-24 pt-16">
        <div className="container-x"><h2 className="mb-8 text-3xl font-bold">More from WOW</h2><div className="grid gap-6 md:grid-cols-3">{more.map((p) => <NewsCard key={p.slug} post={p} />)}</div>
          <div className="mt-10 text-center"><Button to="/franchise" variant="dark">Explore franchise opportunities →</Button></div></div>
      </section>
    </>
  );
}
