import { productList } from './productMock';

const baseReviewTemplates = [
  {
    id: 'fit-finish',
    name: 'Nisha Patel',
    location: 'Ahmedabad',
    rating: 5,
    title: 'Beautiful finish and sparkle',
    comment:
      'The piece feels polished, elegant, and even better in person. Packaging was lovely too.',
    date: '12 Jun 2026',
    verified: true,
  },
  {
    id: 'gift-choice',
    name: 'Rohan Mehta',
    location: 'Mumbai',
    rating: 4,
    title: 'Great gifting choice',
    comment:
      'Bought this as a gift and the overall quality felt premium. Delivery updates were helpful.',
    date: '05 Jun 2026',
    verified: true,
  },
  {
    id: 'daily-wear',
    name: 'Aarti Shah',
    location: 'Surat',
    rating: 5,
    title: 'Lovely for daily wear',
    comment:
      'Comfortable, lightweight, and easy to pair with both festive and everyday looks.',
    date: '28 May 2026',
    verified: true,
  },
];

const createReviewState = product => {
  const items = baseReviewTemplates.map((item, index) => ({
    ...item,
    id: `${product.id}-${item.id}`,
    title:
      index === 0
        ? `${product.title} exceeded expectations`
        : item.title,
  }));

  return {
    summary: {
      average: product.rating,
      totalCount: product.reviews,
      recommendPercent: Math.min(98, Math.max(84, Math.round(product.rating * 20))),
    },
    items,
  };
};

export const initialReviewsByProduct = productList.reduce((accumulator, product) => {
  accumulator[product.id] = createReviewState(product);
  return accumulator;
}, {});
