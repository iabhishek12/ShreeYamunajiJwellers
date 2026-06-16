const heroImage = require('../../assets/images/products/jewelry-login-hero.png');
const modernRingsImage = require('../../assets/images/products/modern-rings.jpg.jpeg');
const signaturePendantImage = require('../../assets/images/products/signature-pendant.jpg.jpeg');

export const heroBanner = {
  eyebrow: 'NEW COLLECTION',
  title: 'Made to Shine.',
  accentTitle: 'Made for You.',
  description: "Timeless designs that celebrate life's most beautiful moments.",
  ctaLabel: 'SHOP NOW',
  image: heroImage,
};

export const categoryItems = [
  { id: 'rings', label: 'RINGS', icon: 'Circle' },
  { id: 'earrings', label: 'EARRINGS', icon: 'Cable' },
  { id: 'necklaces', label: 'NECKLACES', icon: 'Gem' },
  { id: 'bracelets', label: 'BRACELETS', icon: 'BadgeHelp' },
  { id: 'more', label: 'MORE', icon: 'LayoutGrid' },
];

export const assuranceItems = [
  { id: 'diamonds', title: 'CERTIFIED', subtitle: 'DIAMONDS', icon: 'Gem' },
  { id: 'payment', title: 'SECURE', subtitle: 'PAYMENT', icon: 'ShieldCheck' },
  { id: 'returns', title: 'EASY 7-DAY', subtitle: 'RETURNS', icon: 'RotateCcw' },
  { id: 'shipping', title: 'FREE', subtitle: 'SHIPPING', icon: 'Truck' },
];

export const collectionCards = [
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

export const bestSellerItems = [
  {
    id: 'bestseller-1',
    productId: 'infinity-sparkle-ring',
    title: 'Infinity Sparkle Ring',
    subtitle: 'Brilliant-cut solitaire set in 18k gold.',
    price: '499',
    rating: '4.8',
    reviews: 124,
    image: modernRingsImage,
  },
  {
    id: 'bestseller-2',
    productId: 'infinity-sparkle-ring',
    title: 'Classic Solitaire Studs',
    subtitle: 'Timeless diamond studs for every day.',
    price: '599',
    rating: '4.9',
    reviews: 89,
    image: signaturePendantImage,
  },
  {
    id: 'bestseller-3',
    productId: 'infinity-sparkle-ring',
    title: 'Blossom Pendant',
    subtitle: 'Floral shimmer with a fine chain finish.',
    price: '699',
    rating: '4.7',
    reviews: 63,
    image: heroImage,
  },
];

export const promiseSection = {
  eyebrow: 'EST. 1999',
  label: 'THE SHREE YAMUNAJI PROMISE',
  title: 'Jewelry made to live\n',
  accentTitle: 'beautifully.',
  description:
    "Every Shree Yamunaji piece is thoughtfully designed, responsibly sourced and made to become part of your story, from quiet everyday moments to life's biggest celebrations.",
  image: modernRingsImage,
  stats: [
    { id: 'craft', value: '25+', label: 'YEARS OF CRAFT' },
    { id: 'certified', value: '100%', label: 'CERTIFIED' },
    { id: 'clients', value: '50k+', label: 'HAPPY CLIENTS' },
  ],
};

export const newArrivalsSection = {
  label: 'JUST LANDED',
  title: 'New Arrivals',
  description: 'Fresh expressions of timeless beauty, crafted for the moments ahead.',
  items: [
    {
      id: 'arrival-1',
      productId: 'infinity-sparkle-ring',
      title: 'Modern Halo Ring',
      subtitle: 'A halo of diamonds around a brilliant centre.',
      price: '549',
      rating: '4.6',
      reviews: 64,
      image: modernRingsImage,
    },
    {
      id: 'arrival-2',
      productId: 'infinity-sparkle-ring',
      title: 'Aurora Drop Earrings',
      subtitle: 'Graceful drops that move with you.',
      price: '459',
      rating: '4.5',
      reviews: 41,
      image: signaturePendantImage,
    },
    {
      id: 'arrival-3',
      productId: 'infinity-sparkle-ring',
      title: 'Heritage Gold Necklace',
      subtitle: 'A radiant floral pendant with soft shimmer.',
      price: '629',
      rating: '4.8',
      reviews: 56,
      image: heroImage,
    },
    {
      id: 'arrival-4',
      productId: 'infinity-sparkle-ring',
      title: 'Petite Charm Bracelet',
      subtitle: 'Delicate sparkle made for effortless layering.',
      price: '499',
      rating: '4.7',
      reviews: 38,
      image: modernRingsImage,
    },
  ],
};

export const reviewSection = {
  label: 'LOVED BY 50,000+ CUSTOMERS',
  reviews: [
    {
      id: 'review-1',
      quote:
        "I bought studs for my mother and she hasn't taken them off since. Timeless quality with a truly personal touch.",
      initials: 'PN',
      name: 'Priya Nair',
      location: 'Bengaluru',
      badge: 'Verified Buyer',
    },
    {
      id: 'review-2',
      quote:
        'The finish, the sparkle, and the packaging all felt premium. It looked even better in person than it did online.',
      initials: 'AM',
      name: 'Aarav Mehta',
      location: 'Mumbai',
      badge: 'Verified Buyer',
    },
    {
      id: 'review-3',
      quote:
        'Their team helped me pick the perfect anniversary gift. The bracelet felt elegant, modern, and beautifully made.',
      initials: 'RS',
      name: 'Riya Shah',
      location: 'Ahmedabad',
      badge: 'Verified Buyer',
    },
    {
      id: 'review-4',
      quote:
        'Fast delivery, secure packaging, and stunning craftsmanship. It felt like opening something truly special.',
      initials: 'VK',
      name: 'Vikram Khanna',
      location: 'Delhi',
      badge: 'Verified Buyer',
    },
  ],
};

export const bottomNavItems = [
  { id: 'home', label: 'HOME', icon: 'House', active: true },
  { id: 'categories', label: 'CATEGORIES', icon: 'LayoutGrid', active: false },
  { id: 'new-arrivals', label: 'NEW ARRIVALS', icon: 'Sparkles', active: false },
  { id: 'wishlist', label: 'WISHLIST', icon: 'Heart', active: false },
  { id: 'account', label: 'ACCOUNT', icon: 'User', active: false },
];
