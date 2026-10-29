export default function EmojiIcon({ emoji, className = '' }) {
  if (emoji === '🥔') {
    return <img src="/images/hana-na.png" alt="" aria-hidden="true" className={`inline-block align-[-0.15em] object-contain ${className}`} />;
  }

  return emoji;
}
