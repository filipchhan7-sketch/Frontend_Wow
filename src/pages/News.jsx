import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';
import { NEWS, NEWS_CATEGORIES } from '../data/news';

export default function News() {
  const [cat, setCat] = useState('All');
  const posts = cat === 'All' ? NEWS : NEWS.filter((n) => n.category === cat);
  return (
    <>
      <PageHeader eyebrow="News & media" title={'WHAT’S NEW\nAT WOW'} sub="New stores, new flavors, campaigns, events and franchise news." emoji="📰" />
      <section className="section">
        <div className="container-x">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
            {['All', ...NEWS_CATEGORIES].map((t) => (
              <button key={t} onClick={() => setCat(t)} aria-pressed={cat === t} className="relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold">
                {cat === t && <motion.span layoutId="news-pill" className="absolute inset-0 rounded-full bg-brand-choc" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className={`relative ${cat === t ? 'text-brand-tile' : 'hover:text-brand-red'}`}>{t}</span>
              </button>
            ))}
          </div>
          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">{posts.map((p) => <NewsCard key={p.slug} post={p} />)}</AnimatePresence>
          </motion.div>
          {posts.length === 0 && <p className="mt-12 text-center text-brand-choc/60">Nothing here yet — check back soon!</p>}
        </div>
      </section>
    </>
  );
}
