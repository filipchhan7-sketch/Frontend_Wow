// MENU DATA — edit this file to change the menu.
// Photos go in:  public/images/menu/   (use them as '/images/menu/name.png')
// Best format: PNG or WebP cut-out with TRANSPARENT background, ~900px wide.
// If an image is missing, the emoji shows instead, so nothing breaks.
// bg / text = Tailwind classes. Use any color, e.g. 'bg-[#FFB800]'.

export const MENU_HERO = {
  name: 'GOLDEN\nLONGEST FRIES',
  badge: '24K GOLD',
  image: '/images/menu/golden-fries.png',
  emoji: '🍟',
};

export const MENU = [
  { id: 'signature-mix', name: 'Signature Mix', price: 'USD 3.57', image: '/images/menu/signature-mix.png', emoji: '🍟', bg: 'bg-[#FFB800]', text: 'text-brand-choc' },
  { id: 'spicy-long-potato', name: 'Spicy Long Potato', price: 'USD 3.57', image: '/images/menu/spicy-long-potato.png', emoji: '🌶️', bg: 'bg-[#B3122E]', text: 'text-white' },
  { id: 'chicken-pop', name: 'Chicken Pop', price: '', image: '/images/menu/chicken-pop.png', emoji: '🍗', bg: 'bg-[#3B2418]', text: 'text-white' },
  { id: 'fried-nugget', name: 'Fried Nugget', price: '', image: '/images/menu/fried-nugget.png', emoji: '🍗', bg: 'bg-[#E8731A]', text: 'text-white' },
  { id: 'chicken-ring', name: 'Chicken Ring', price: '', image: '/images/menu/chicken-ring.png', emoji: '🍩', bg: 'bg-[#A50E27]', text: 'text-white' },
  { id: 'chicken-wing', name: 'Chicken Wing', price: '', image: '/images/menu/chicken-wing.png', emoji: '🍗', bg: 'bg-[#FFF1EC]', text: 'text-brand-choc' },
];

// How many tiles show before the "See all menu" button is pressed.
export const PREVIEW_COUNT = 4;