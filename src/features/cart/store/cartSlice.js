import { createSlice } from '@reduxjs/toolkit';
import { initialCartItems } from '../../../data/mock/cartMock';

const makeCartItemId = ({ productId, selectedMetalId, selectedSizeId }) =>
  `${productId}-${selectedMetalId || 'default'}-${selectedSizeId || 'default'}`;

const syncCartTotals = state => {
  state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
};

const initialState = {
  items: initialCartItems,
  totalQuantity: initialCartItems.reduce((total, item) => total + item.quantity, 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const {
        productId,
        selectedMetalId,
        selectedSizeId = null,
        quantity = 1,
        unitPrice,
      } = action.payload;
      const id = makeCartItemId({ productId, selectedMetalId, selectedSizeId });
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          productId,
          selectedMetalId,
          selectedSizeId,
          quantity,
          ...(unitPrice ? { unitPrice } : {}),
        });
      }

      syncCartTotals(state);
    },
    incrementCartItem(state, action) {
      const item = state.items.find(cartItem => cartItem.id === action.payload);

      if (item) {
        item.quantity += 1;
      }

      syncCartTotals(state);
    },
    decrementCartItem(state, action) {
      const item = state.items.find(cartItem => cartItem.id === action.payload);

      if (item) {
        item.quantity = Math.max(1, item.quantity - 1);
      }

      syncCartTotals(state);
    },
    removeCartItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      syncCartTotals(state);
    },
    clearCart(state) {
      state.items = [];
      syncCartTotals(state);
    },
  },
});

export const {
  addToCart,
  clearCart,
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
