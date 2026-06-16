const ringPrimaryImage = require('../../assets/images/products/modern-rings.jpg.jpeg');
const ringDetailImage = require('../../assets/images/products/signature-pendant.jpg.jpeg');
const ringLifestyleImage = require('../../assets/images/products/jewelry-login-hero.png');

export const productDetails = {
  'infinity-sparkle-ring': {
    id: 'infinity-sparkle-ring',
    badge: 'BEST SELLER',
    title: 'Infinity Sparkle Ring',
    subtitle: '18K Gold Solitaire',
    rating: 4.8,
    reviews: 124,
    price: 499,
    originalPrice: 599,
    discountLabel: '17% OFF',
    activeCartCount: 3,
    defaultMetal: 'yellow-gold',
    defaultSize: '6',
    stockLabel: 'In stock - ready to ship',
    details:
      "A timeless solitaire on a slender band, the Infinity Sparkle Ring is designed to celebrate life's biggest yes and every day after.",
    gallery: [
      { id: 'main', image: ringPrimaryImage, type: 'image' },
      { id: 'lifestyle', image: ringLifestyleImage, type: 'image' },
      { id: 'video', image: ringDetailImage, type: 'video' },
    ],
    assuranceItems: [
      { id: 'certified', title: 'CERTIFIED', subtitle: 'DIAMONDS', icon: 'Gem' },
      { id: 'hallmarked', title: 'HALLMARKED', subtitle: '18K GOLD', icon: 'Shield' },
      { id: 'warranty', title: 'LIFETIME', subtitle: 'WARRANTY', icon: 'BadgeCheck' },
      { id: 'shipping', title: 'FREE', subtitle: 'SHIPPING', icon: 'Truck' },
    ],
    metals: [
      { id: 'yellow-gold', label: 'Yellow Gold', value: '18K Yellow Gold', color: '#e0b44f' },
      { id: 'white-gold', label: 'White Gold', value: '18K White Gold', color: '#dfdfdf' },
      { id: 'rose-gold', label: 'Rose Gold', value: '18K Rose Gold', color: '#dda58e' },
    ],
    sizes: [
      { id: '5', label: '5' },
      { id: '6', label: '6' },
      { id: '7', label: '7' },
      { id: '8', label: '8' },
    ],
    highlights: [
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
    ],
  },
};
