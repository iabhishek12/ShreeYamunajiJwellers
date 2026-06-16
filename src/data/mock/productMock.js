const modernRingsImage = require('../../assets/images/products/modern-rings.jpg.jpeg');
const signaturePendantImage = require('../../assets/images/products/signature-pendant.jpg.jpeg');
const heroImage = require('../../assets/images/products/jewelry-login-hero.png');

const baseAssuranceItems = [
  { id: 'certified', title: 'CERTIFIED', subtitle: 'DIAMONDS', icon: 'Gem' },
  { id: 'hallmarked', title: 'HALLMARKED', subtitle: '18K GOLD', icon: 'Shield' },
  { id: 'warranty', title: 'LIFETIME', subtitle: 'WARRANTY', icon: 'BadgeCheck' },
  { id: 'shipping', title: 'FREE', subtitle: 'SHIPPING', icon: 'Truck' },
];

const baseMetals = [
  { id: 'yellow-gold', label: 'Yellow Gold', value: '18K Yellow Gold', color: '#e0b44f' },
  { id: 'white-gold', label: 'White Gold', value: '18K White Gold', color: '#dfdfdf' },
  { id: 'rose-gold', label: 'Rose Gold', value: '18K Rose Gold', color: '#dda58e' },
];

const baseSizes = [
  { id: '5', label: '5' },
  { id: '6', label: '6' },
  { id: '7', label: '7' },
  { id: '8', label: '8' },
];

const baseHighlights = [
  {
    id: 'delivery',
    title: 'Estimated Delivery',
    description: 'Jun 19 - Jun 21',
    icon: 'Truck',
  },
  {
    id: 'returns',
    title: 'Easy 7-Day Returns',
    description: 'Free & easy returns.',
    icon: 'RotateCcw',
  },
];

function createProduct({
  id,
  categoryId,
  badge,
  title,
  subtitle,
  rating,
  reviews,
  price,
  originalPrice,
  discountLabel,
  details,
  gallery,
  defaultMetal = 'yellow-gold',
  defaultSize = '6',
  stockLabel = 'In stock - ready to ship',
  activeCartCount = 3,
}) {
  return {
    id,
    categoryId,
    badge,
    title,
    subtitle,
    rating,
    reviews,
    price,
    originalPrice,
    discountLabel,
    activeCartCount,
    defaultMetal,
    defaultSize,
    stockLabel,
    details,
    gallery,
    assuranceItems: baseAssuranceItems,
    metals: baseMetals,
    sizes: baseSizes,
    highlights: baseHighlights,
  };
}

export const productDetails = {
  'infinity-sparkle-ring': createProduct({
    id: 'infinity-sparkle-ring',
    categoryId: 'rings',
    badge: 'BEST SELLER',
    title: 'Infinity Sparkle Ring',
    subtitle: '18K Gold Solitaire',
    rating: 4.8,
    reviews: 124,
    price: 499,
    originalPrice: 599,
    discountLabel: '17% OFF',
    details:
      "A timeless solitaire on a slender band, the Infinity Sparkle Ring is designed to celebrate life's biggest yes and every day after.",
    gallery: [
      { id: 'main', image: modernRingsImage, type: 'image' },
      { id: 'lifestyle', image: heroImage, type: 'image' },
      { id: 'video', image: signaturePendantImage, type: 'video' },
    ],
  }),
  'classic-solitaire-studs': createProduct({
    id: 'classic-solitaire-studs',
    categoryId: 'earrings',
    badge: 'CUSTOMER FAVORITE',
    title: 'Classic Solitaire Studs',
    subtitle: '18K White Gold Earrings',
    rating: 4.9,
    reviews: 89,
    price: 599,
    originalPrice: 699,
    discountLabel: '14% OFF',
    defaultMetal: 'white-gold',
    details:
      'Refined solitaire studs with brilliant sparkle and clean prong setting, crafted to move effortlessly from everyday wear to evening occasions.',
    gallery: [
      { id: 'main', image: signaturePendantImage, type: 'image' },
      { id: 'lifestyle', image: modernRingsImage, type: 'image' },
      { id: 'video', image: heroImage, type: 'video' },
    ],
  }),
  'blossom-pendant': createProduct({
    id: 'blossom-pendant',
    categoryId: 'necklaces',
    badge: 'SIGNATURE PICK',
    title: 'Blossom Pendant',
    subtitle: '18K Rose Gold Pendant',
    rating: 4.7,
    reviews: 63,
    price: 699,
    originalPrice: 799,
    discountLabel: '12% OFF',
    defaultMetal: 'rose-gold',
    details:
      'A floral-inspired pendant with soft shimmer and graceful curves, designed to add warmth and polish to your daily stack.',
    gallery: [
      { id: 'main', image: heroImage, type: 'image' },
      { id: 'lifestyle', image: signaturePendantImage, type: 'image' },
      { id: 'video', image: modernRingsImage, type: 'video' },
    ],
  }),
  'modern-halo-ring': createProduct({
    id: 'modern-halo-ring',
    categoryId: 'rings',
    badge: 'JUST LANDED',
    title: 'Modern Halo Ring',
    subtitle: '18K Gold Diamond Ring',
    rating: 4.6,
    reviews: 64,
    price: 549,
    originalPrice: 649,
    discountLabel: '15% OFF',
    details:
      'A modern halo silhouette with a radiant center stone and delicate surround, crafted for bold sparkle with a graceful profile.',
    gallery: [
      { id: 'main', image: modernRingsImage, type: 'image' },
      { id: 'lifestyle', image: signaturePendantImage, type: 'image' },
      { id: 'video', image: heroImage, type: 'video' },
    ],
  }),
  'aurora-drop-earrings': createProduct({
    id: 'aurora-drop-earrings',
    categoryId: 'earrings',
    badge: 'NEW ARRIVAL',
    title: 'Aurora Drop Earrings',
    subtitle: '18K White Gold Drops',
    rating: 4.5,
    reviews: 41,
    price: 459,
    originalPrice: 529,
    discountLabel: '13% OFF',
    defaultMetal: 'white-gold',
    details:
      'Graceful drop earrings with clean lines and a bright finish, designed to bring movement and elegance to special moments.',
    gallery: [
      { id: 'main', image: signaturePendantImage, type: 'image' },
      { id: 'lifestyle', image: heroImage, type: 'image' },
      { id: 'video', image: modernRingsImage, type: 'video' },
    ],
  }),
  'heritage-gold-necklace': createProduct({
    id: 'heritage-gold-necklace',
    categoryId: 'necklaces',
    badge: 'NEW ARRIVAL',
    title: 'Heritage Gold Necklace',
    subtitle: '18K Gold Necklace',
    rating: 4.8,
    reviews: 56,
    price: 629,
    originalPrice: 739,
    discountLabel: '15% OFF',
    details:
      'A radiant necklace with heritage-inspired detailing and soft shine, made to stand out beautifully on its own or in layers.',
    gallery: [
      { id: 'main', image: heroImage, type: 'image' },
      { id: 'lifestyle', image: modernRingsImage, type: 'image' },
      { id: 'video', image: signaturePendantImage, type: 'video' },
    ],
  }),
  'petite-charm-bracelet': createProduct({
    id: 'petite-charm-bracelet',
    categoryId: 'bracelets',
    badge: 'NEW ARRIVAL',
    title: 'Petite Charm Bracelet',
    subtitle: '18K Gold Bracelet',
    rating: 4.7,
    reviews: 38,
    price: 499,
    originalPrice: 569,
    discountLabel: '12% OFF',
    details:
      'A delicate bracelet with petite charm accents and light-catching polish, perfect for effortless everyday layering.',
    gallery: [
      { id: 'main', image: modernRingsImage, type: 'image' },
      { id: 'lifestyle', image: heroImage, type: 'image' },
      { id: 'video', image: signaturePendantImage, type: 'video' },
    ],
  }),
  'radiant-circle-bangle': createProduct({
    id: 'radiant-circle-bangle',
    categoryId: 'bangles',
    badge: 'TRENDING',
    title: 'Radiant Circle Bangle',
    subtitle: '18K Gold Bangle',
    rating: 4.6,
    reviews: 52,
    price: 579,
    originalPrice: 659,
    discountLabel: '12% OFF',
    details:
      'A slim polished bangle with a circular center motif, designed for graceful stacking and timeless sparkle.',
    gallery: [
      { id: 'main', image: modernRingsImage, type: 'image' },
      { id: 'lifestyle', image: signaturePendantImage, type: 'image' },
      { id: 'video', image: heroImage, type: 'video' },
    ],
  }),
  'heritage-mens-band': createProduct({
    id: 'heritage-mens-band',
    categoryId: 'mens-jewelry',
    badge: 'EDITOR PICK',
    title: 'Heritage Men\'s Band',
    subtitle: '18K Gold Men\'s Ring',
    rating: 4.8,
    reviews: 47,
    price: 649,
    originalPrice: 749,
    discountLabel: '13% OFF',
    details:
      'A bold men\'s band with a polished finish and confident silhouette, created for everyday sophistication.',
    gallery: [
      { id: 'main', image: heroImage, type: 'image' },
      { id: 'lifestyle', image: modernRingsImage, type: 'image' },
      { id: 'video', image: signaturePendantImage, type: 'video' },
    ],
  }),
};

export const productList = Object.values(productDetails);
