import { createSlice } from '@reduxjs/toolkit';
import { initialWishlistItems } from '../../../data/mock/wishlistMock';

const initialState = {
  items: initialWishlistItems,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlistItem(state, action) {
      const exists = state.items.some(item => item.productId === action.payload.productId);

      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeWishlistItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    removeWishlistProduct(state, action) {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const {
  addWishlistItem,
  clearWishlist,
  removeWishlistItem,
  removeWishlistProduct,
} = wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;
