export default function NewsArtwork({ post, variant = 'card' }) {
  const isHero = variant === 'hero';

  return (
    <div
      aria-hidden="true"
      className={`relative isolate grid ${isHero ? 'aspect-[1.08] w-full max-w-md rounded-[2rem]' : 'h-40 w-full'} place-items-center overflow-hidden bg-gradient-to-br ${post.gradient} ${isHero ? 'shadow-card' : ''}`}
    >
      <span className="absolute -right-10 -top-12 h-48 w-48 rounded-full border-[20px] border-brand-tile/20 sm:h-64 sm:w-64" />
      <span className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full border-[16px] border-brand-choc/10 sm:h-48 sm:w-48" />
      <span className={`relative z-10 grid aspect-square place-items-center rounded-[42%] border border-brand-tile/70 bg-brand-tile/75 shadow-card backdrop-blur-sm ${isHero ? 'w-[48%] text-7xl sm:text-8xl' : 'w-[38%] text-5xl'}`}>
        {post.emoji}
      </span>
    </div>
  );
}
