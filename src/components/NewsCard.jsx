import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NewsArtwork from './NewsArtwork';

export const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function NewsCard({ post, editorialArtwork = false }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} whileHover={{ y: -8 }} className="h-full">
      <Link to={`/news/${post.slug}`} className="card flex h-full flex-col overflow-hidden p-0">
        {editorialArtwork ? (
          <NewsArtwork post={post} />
        ) : (
          <div className={`grid h-40 place-items-center bg-gradient-to-br ${post.gradient} text-7xl`}>{post.emoji}</div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-xs"><span className="chip">{post.category}</span><span className="text-brand-choc/50">{fmtDate(post.date)}</span></div>
          <h3 className="mt-3 text-lg font-bold leading-snug">{post.title}</h3>
          <p className="mt-2 flex-1 text-sm text-brand-choc/70">{post.excerpt}</p>
          <span className="mt-4 text-sm font-bold text-brand-red">Read more →</span>
        </div>
      </Link>
    </motion.div>
  );
}
