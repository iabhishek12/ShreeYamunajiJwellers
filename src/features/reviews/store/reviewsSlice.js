import { createSlice } from '@reduxjs/toolkit';
import { initialReviewsByProduct } from '../../../data/mock/reviewMock';

const initialState = {
  byProduct: initialReviewsByProduct,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview(state, action) {
      const {
        comment,
        name,
        productId,
        rating,
        title,
      } = action.payload;

      const existing = state.byProduct[productId] || {
        summary: {
          average: rating,
          totalCount: 0,
          recommendPercent: 100,
        },
        items: [],
      };

      const nextCount = existing.summary.totalCount + 1;
      const nextAverage =
        (existing.summary.average * existing.summary.totalCount + rating) / nextCount;

      const review = {
        id: `${productId}-${Date.now()}`,
        name,
        location: 'Member Review',
        rating,
        title,
        comment,
        date: 'Today',
        verified: true,
      };

      state.byProduct[productId] = {
        summary: {
          average: Number(nextAverage.toFixed(1)),
          totalCount: nextCount,
          recommendPercent: Math.min(
            99,
            Math.max(existing.summary.recommendPercent, Math.round((nextAverage / 5) * 100)),
          ),
        },
        items: [review, ...existing.items],
      };
    },
  },
});

export const { addReview } = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
