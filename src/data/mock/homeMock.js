const heroImage = require('../../assets/images/products/jewelry-login-hero.png');
const modernRingsImage = require('../../assets/images/products/modern-rings.jpg.jpeg');
const signaturePendantImage = require('../../assets/images/products/signature-pendant.jpg.jpeg');

const heroBanner = {
  eyebrow: 'NEW COLLECTION',
  title: 'Made to Shine.',
  accentTitle: 'Made for You.',
  description: "Timeless designs that celebrate life's most beautiful moments.",
  ctaLabel: 'SHOP NOW',
  image: heroImage,
};

const categoryItems = [
  { id: 'rings', label: 'RINGS', icon: 'Circle' },
  { id: 'earrings', label: 'EARRINGS', icon: 'Cable' },
  { id: 'necklaces', label: 'NECKLACES', icon: 'Gem' },
  { id: 'bracelets', label: 'BRACELETS', icon: 'BadgeHelp' },
  { id: 'more', label: 'MORE', icon: 'LayoutGrid' },
];

const assuranceItems = [
  { id: 'diamonds', title: 'CERTIFIED', subtitle: 'DIAMONDS', icon: 'Gem' },
  { id: 'payment', title: 'SECURE', subtitle: 'PAYMENT', icon: 'ShieldCheck' },
  { id: 'returns', title: 'EASY 7-DAY', subtitle: 'RETURNS', icon: 'RotateCcw' },
  { id: 'shipping', title: 'FREE', subtitle: 'SHIPPING', icon: 'Truck' },
];

const collectionCards = [
  {
    id: 'modern-essentials',
    title: 'Modern\nEssentials',
    description: 'Everyday pieces,\neffortless elegance.',
    ctaLabel: 'SHOP NOW',
    image: modernRingsImage,
    dark: true,
  },
  {
    id: 'signature-collection',
    title: 'Signature\nCollection',
    description: 'Iconic styles,\ncrafted to last.',
    ctaLabel: 'SHOP NOW',
    image: signaturePendantImage,
    dark: false,
  },
];

const bestSellerItems = [
  {
    id: 'bestseller-1',
    title: 'Solitaire Ring',
    price: 'Rs. 48,500',
    image: modernRingsImage,
  },
  {
    id: 'bestseller-2',
    title: 'Floral Pendant',
    price: 'Rs. 32,990',
    image: signaturePendantImage,
  },
];

const bottomNavItems = [
  { id: 'home', label: 'HOME', icon: 'House', active: true },
  { id: 'categories', label: 'CATEGORIES', icon: 'LayoutGrid', active: false },
  { id: 'new-arrivals', label: 'NEW ARRIVALS', icon: 'Sparkles', active: false },
  { id: 'wishlist', label: 'WISHLIST', icon: 'Heart', active: false },
  { id: 'account', label: 'ACCOUNT', icon: 'User', active: false },
];

module.exports = {
  heroBanner,
  categoryItems,
  assuranceItems,
  collectionCards,
  bestSellerItems,
  bottomNavItems,
};
