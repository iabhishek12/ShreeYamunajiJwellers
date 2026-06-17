export const notificationTabs = ['All', 'Orders', 'Offers', 'Account'];

export const notificationItems = [
  {
    id: 'order-shipped',
    type: 'Orders',
    title: 'Order #SYJ1024 shipped',
    message: 'Your jewellery is packed and on the way.',
    time: '12 min ago',
    icon: 'Truck',
    unread: true,
  },
  {
    id: 'festive-offer',
    type: 'Offers',
    title: 'Festive gold picks',
    message: 'Selected designs now include complimentary gift packaging.',
    time: '2 hrs ago',
    icon: 'Sparkles',
    unread: true,
  },
  {
    id: 'wishlist-back',
    type: 'Offers',
    title: 'Wishlist piece available',
    message: 'Modern Halo Ring is ready to ship again.',
    time: 'Yesterday',
    icon: 'Heart',
    unread: false,
  },
  {
    id: 'payment-safe',
    type: 'Account',
    title: 'Checkout details saved',
    message: 'Your default address is set for faster checkout.',
    time: '15 Jun',
    icon: 'ShieldCheck',
    unread: false,
  },
  {
    id: 'delivery-reminder',
    type: 'Orders',
    title: 'Delivery reminder',
    message: 'Please keep an ID proof ready for secure handover.',
    time: '14 Jun',
    icon: 'Package',
    unread: false,
  },
];

export const notificationsBottomNavItems = [
  { id: 'home', label: 'HOME', icon: 'House', active: false, route: 'Home' },
  { id: 'categories', label: 'CATEGORIES', icon: 'LayoutGrid', active: false, route: 'Categories' },
  { id: 'wishlist', label: 'WISHLIST', icon: 'Heart', active: false, route: 'Wishlist' },
  { id: 'orders', label: 'ORDERS', icon: 'ShoppingBag', active: false, route: 'Orders' },
  { id: 'profile', label: 'PROFILE', icon: 'User', active: false, route: 'Profile' },
];
