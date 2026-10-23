// ===== All site copy lives here. Edit text without touching components. =====

export const SITE = {
  name: 'WOW POTATO',
  tagline: 'The Longest Fries. The Biggest Smiles.',
  phone: '+855 12 333 444', // TODO: real phone
  email: 'hello@wowpotato.com', // TODO: real email
  address: 'Phnom Penh, Cambodia',
  social: { facebook: '#', instagram: '#', tiktok: '#', youtube: '#' }, // TODO: real links
};

export const NAV = [
  { to: '/story', label: 'Our Story' },
  { to: '/why-wow', label: 'Why WOW' },
  { to: '/menu', label: 'Menu' },
  { to: '/stores', label: 'Stores' },
  { to: '/franchise', label: 'Franchise' },
  { to: '/events', label: 'Events' },
  { to: '/news', label: 'News' },
];

export const MARQUEE = ['Longest Fries', 'Biggest Smiles', 'Made Fresh', 'Fun for Everyone', 'Franchise Opportunities', 'From Cambodia to the World'];

export const WHY_WOW = [
  { emoji: '🥔', title: 'Unique Product', text: 'Extra-long fries create strong visual differentiation and a memorable first bite.' },
  { emoji: '😊', title: 'Loved by Families', text: 'Designed around fun, sharing and smiles — for kids, teens and grown-ups alike.' },
  { emoji: '⚡', title: 'Fast-Service Concept', text: 'Simple product preparation and a compact operating model.' },
  { emoji: '🏬', title: 'Mall-Friendly Format', text: 'Built for high-traffic retail environments.' },
  { emoji: '📈', title: 'Scalable Business', text: 'Standardized systems allow replication across locations.' },
  { emoji: '🌏', title: 'Built for Expansion', text: 'Developed with the ambition to become an international potato brand.' },
];

// approved:false => shown as a dashed "pending approval" placeholder.
// Flip to true ONLY after management approves public disclosure.
export const STATS = [
  { id: 'stores', label: 'WOW POTATO Stores', value: 3, suffix: '', approved: true },
  { id: 'mall', label: 'Mall Partner', value: 'AEON MALL 1', approved: true },
  { id: 'tx', label: 'Daily Transactions / Store', value: 'AEON MALL 2', approved: true },
  { id: 'margin', label: 'Operating Margin', value: 'AEON MALL 3', approved: true },
];

export const TIMELINE = [
  { title: 'The Idea', text: 'One potato idea: make fries fun again.', state: 'done', emoji: '💡' },
  { title: 'First WOW POTATO', text: 'The very first store opens its doors.', state: 'done', emoji: '🥔' },
  { title: 'AEON Stores', text: 'Growing inside AEON malls.', state: 'done', emoji: '🏬' },
  { title: 'Multi-Store Operation', text: 'Running several stores with one standard.', state: 'done', emoji: '🏪' },
  { title: 'Operation Excellence', text: 'SOPs, training, audits and KPIs.', state: 'now', emoji: '⚙️' },
  { title: 'Cambodia Expansion', text: 'More cities, more smiles.', state: 'next', emoji: '🇰🇭' },
  { title: 'International Franchise', text: 'WOW POTATO around the world.', state: 'next', emoji: '🌎' },
];

export const VISION = "To be the world's No.1 longest and most flavorful fries brand, delivering smiles to everyone.";
export const MISSION = ['Affordable prices', 'Fast service', 'Best quality fries', 'Unique recipe', 'Welcoming place', 'Continuous improvement'];

export const SMILE = [
  { letter: 'S', title: 'Serve with Smile', text: 'Every guest leaves happier than they arrived.' },
  { letter: 'M', title: 'Master the Standard', text: 'Great fries, every store, every time.' },
  { letter: 'I', title: 'Innovate & Improve', text: 'We never stop making it better.' },
  { letter: 'L', title: 'Lead with Responsibility', text: 'We own our results and our people.' },
  { letter: 'E', title: 'Earn Your Work', text: 'Trust is built one fry at a time.' },
];

export const FRANCHISE_WHY = [
  { emoji: '🥔', title: 'Different Product', text: 'Long fries create a memorable product experience.' },
  { emoji: '❤️', title: 'Strong Brand', text: 'A fun, emotional brand designed to connect with families, kids and younger consumers.' },
  { emoji: '🏪', title: 'Flexible Store Format', text: 'Potentially suitable for malls, kiosks and other high-traffic locations.' },
  { emoji: '⚙️', title: 'Standardized Operations', text: 'We are developing SOPs, work instructions, checklists, training and audit systems.' },
  { emoji: '📚', title: 'Training & Support', text: 'Franchise partners receive structured training and operational guidance.' },
  { emoji: '🌎', title: 'Growth Opportunity', text: 'Build one store — then potentially grow into multiple locations and territories.' },
];

export const FRANCHISE_STEPS = [
  'Submit Inquiry', 'Initial Discussion', 'Market & Territory Review', 'Business Discussion', 'Franchise Approval',
  'Site Selection', 'Store Development', 'Training', 'Store Opening', 'Ongoing Support',
];

export const FORMATS = [
  { name: 'Kiosk', emoji: '🛒', where: 'Mall / High Traffic', size: 'X m²' },
  { name: 'Compact Store', emoji: '🏪', where: 'Mall / Retail', size: 'X m²' },
  { name: 'Standard Store', emoji: '🏬', where: 'Mall / High Traffic', size: 'X m²' },
  { name: 'Flagship', emoji: '⭐', where: 'Major Retail Area', size: 'X m²' },
];

export const WHAT_YOU_GET = [
  { emoji: '🏗️', title: 'Store Development', items: ['Store design', 'Layout guideline', 'Equipment specification', 'Construction guideline', 'Opening support'] },
  { emoji: '👨‍🍳', title: 'Operations', items: ['Operations manual', 'SOPs', 'Work instructions', 'Food safety standards', 'Quality standards'] },
  { emoji: '🎓', title: 'Training', items: ['Franchisee training', 'Store team training', 'Food preparation', 'Customer service', 'Store management'] },
  { emoji: '📣', title: 'Marketing', items: ['Brand guidelines', 'Campaign support', 'Social media guidelines', 'Launch campaign', 'Promotional materials'] },
  { emoji: '📊', title: 'Business Support', items: ['KPI framework', 'Inventory management', 'Store audit', 'Continuous improvement'] },
];

export const PROFILES = [
  { emoji: '💼', title: 'Entrepreneurs', text: 'People who want to build a scalable F&B business.' },
  { emoji: '🏢', title: 'Business Groups', text: 'Companies looking for a proven consumer brand.' },
  { emoji: '🏬', title: 'Mall / Retail Partners', text: 'Partners with access to strong locations.' },
  { emoji: '🌏', title: 'International Partners', text: 'Groups interested in developing WOW POTATO in their country.' },
];

export const REGIONS = [
  { name: 'Cambodia', flag: '🇰🇭', status: 'Active', text: 'Our home market and proving ground.' },
  { name: 'Southeast Asia', flag: '🌴', status: 'Coming Soon', text: 'Our next territories.' },
  { name: 'Asia', flag: '🌏', status: 'Planned', text: 'Regional master-franchise opportunities.' },
  { name: 'Global', flag: '🌎', status: 'Vision', text: 'The world’s No.1 longest fries brand.' },
];

export const EVENT_TYPES = [
  { emoji: '🎂', title: 'Birthday Parties' },
  { emoji: '🏫', title: 'School Events' },
  { emoji: '🏢', title: 'Corporate Events' },
  { emoji: '🎪', title: 'Festivals' },
  { emoji: '🏬', title: 'Mall Events' },
  { emoji: '🎉', title: 'Brand Activations' },
];

export const INVESTMENT_RANGES = ['Below $100K', '$100K–$250K', '$250K–$500K', '$500K–$1M', '$1M+'];
export const STORE_COUNTS = ['1', '2–5', '6–10', '10+'];
