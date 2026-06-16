import { productList } from './productMock';

const heroImage = require('../../assets/images/products/jewelry-login-hero.png');
const modernRingsImage = require('../../assets/images/products/modern-rings.jpg.jpeg');
const signaturePendantImage = require('../../assets/images/products/signature-pendant.jpg.jpeg');

const categoryCardMeta = [
  {
    id: 'rings',
    title: 'RINGS',
    subtitle: '152+ Styles',
    icon: 'Circle',
    image: modernRingsImage,
  },
  {
    id: 'necklaces',
    title: 'NECKLACES',
    subtitle: '120+ Styles',
    icon: 'Cable',
    image: heroImage,
  },
  {
    id: 'earrings',
    title: 'EARRINGS',
    subtitle: '180+ Styles',
    icon: 'Sparkles',
    image: signaturePendantImage,
  },
  {
    id: 'bracelets',
    title: 'BRACELETS',
    subtitle: '98+ Styles',
    icon: 'BadgeHelp',
    image: modernRingsImage,
  },
  {
    id: 'bangles',
    title: 'BANGLES',
    subtitle: '75+ Styles',
    icon: 'Circle',
    image: modernRingsImage,
  },
  {
    id: 'mens-jewelry',
    title: "MEN'S JEWELRY",
    subtitle: '60+ Styles',
    icon: 'User',
    image: heroImage,
  },
];

export const categoryHero = {
  title: 'Shop by Category',
  description: 'Find pieces that define your shine',
  image: heroImage,
};

export const categoryCards = categoryCardMeta.map(card => {
  const relatedProducts = productList.filter(product => product.categoryId === card.id);

  return {
    ...card,
    featuredProductId: relatedProducts[0]?.id ?? productList[0]?.id,
    productCount: relatedProducts.length,
  };
});

export const categoryPromo = {
  eyebrow: 'NEW COLLECTION',
  title: 'Timeless Elegance',
  description: 'Crafted to celebrate every moment',
  buttonLabel: 'EXPLORE NOW',
  image: signaturePendantImage,
  featuredProductId: 'heritage-gold-necklace',
};

export const categoryAssuranceItems = [
  { id: 'certified', title: 'CERTIFIED', subtitle: 'DIAMONDS', icon: 'Gem' },
  { id: 'hallmark', title: 'BIS HALLMARK', subtitle: 'GOLD', icon: 'ShieldCheck' },
  { id: 'returns', title: '15 DAYS', subtitle: 'RETURNS', icon: 'RotateCcw' },
  { id: 'shipping', title: 'FREE SHIPPING', subtitle: 'ON ORDERS ₹4999+', icon: 'Truck' },
];

export const categoryBottomNavItems = [
  { id: 'home', label: 'HOME', icon: 'House', active: false, route: 'Home' },
  { id: 'categories', label: 'CATEGORIES', icon: 'LayoutGrid', active: true, route: 'Categories' },
  { id: 'wishlist', label: 'WISHLIST', icon: 'Heart', active: false },
  { id: 'orders', label: 'ORDERS', icon: 'ShoppingBag', active: false },
  { id: 'profile', label: 'PROFILE', icon: 'User', active: false },
];
