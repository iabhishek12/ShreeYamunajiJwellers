export const initialCartItems = [
  {
    id: 'infinity-sparkle-ring-yellow-gold-6',
    productId: 'infinity-sparkle-ring',
    selectedMetalId: 'yellow-gold',
    selectedSizeId: '6',
    quantity: 1,
  },
  {
    id: 'heritage-gold-necklace-yellow-gold-default',
    productId: 'heritage-gold-necklace',
    selectedMetalId: 'yellow-gold',
    selectedSizeId: null,
    quantity: 1,
  },
  {
    id: 'aurora-drop-earrings-yellow-gold-default',
    productId: 'aurora-drop-earrings',
    selectedMetalId: 'yellow-gold',
    selectedSizeId: null,
    quantity: 1,
  },
];

export const cartAssuranceItems = [
  { id: 'secure', title: '100% Secure', subtitle: 'Checkout', icon: 'ShieldCheck' },
  { id: 'returns', title: '15 Days Easy', subtitle: 'Returns', icon: 'RotateCcw' },
  { id: 'shipping', title: 'Free Shipping', subtitle: 'on orders Rs 4999+', icon: 'Package' },
];

export const cartBottomNavItems = [
  { id: 'home', label: 'HOME', icon: 'House', active: false, route: 'Home' },
  { id: 'categories', label: 'CATEGORIES', icon: 'LayoutGrid', active: false, route: 'Categories' },
  { id: 'wishlist', label: 'WISHLIST', icon: 'Heart', active: false, route: 'Wishlist' },
  { id: 'cart', label: 'CART', icon: 'ShoppingBag', active: true, route: 'Cart' },
  { id: 'profile', label: 'PROFILE', icon: 'User', active: false, route: 'Profile' },
];
