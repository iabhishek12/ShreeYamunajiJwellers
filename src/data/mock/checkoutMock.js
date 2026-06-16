export const checkoutAddresses = [
  {
    id: 'home',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    label: 'Home',
    line1: '24 Lotus Residency, Satellite Road',
    line2: 'Ahmedabad, Gujarat 380015',
  },
  {
    id: 'work',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    label: 'Work',
    line1: 'Shree Business Hub, CG Road',
    line2: 'Ahmedabad, Gujarat 380009',
  },
];

export const checkoutExpectedDelivery = {
  title: 'Expected Delivery',
  subtitle: 'Expected delivery Jun 19 - Jun 21',
  priceLabel: 'FREE',
};

export const checkoutPaymentMethods = [
  {
    id: 'card',
    title: 'Credit / Debit Card',
    subtitle: 'Visa, Mastercard, Rupay',
    icon: 'card',
  },
  {
    id: 'upi',
    title: 'UPI Payment',
    subtitle: 'Google Pay, PhonePe, Paytm',
    icon: 'wallet',
  },
  {
    id: 'cod',
    title: 'Cash on Delivery',
    subtitle: 'Pay after secure delivery',
    icon: 'cash',
  },
];

export const checkoutOffers = [
  {
    id: 'welcome',
    code: 'YAMUNA10',
    title: 'Apply YAMUNA10',
    subtitle: 'Extra 10% off on your first jewelry order',
  },
  {
    id: 'gold',
    code: 'GOLDLOVE',
    title: 'Get 20% off on gold jewelry',
    subtitle: 'Free insured shipping and priority packing',
  },
];

export const checkoutSteps = [
  { id: 'cart', label: 'Cart', done: true },
  { id: 'details', label: 'Details', done: true },
  { id: 'pay', label: 'Pay', done: false },
];
