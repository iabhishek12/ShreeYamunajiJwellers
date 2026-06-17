import { createSlice } from '@reduxjs/toolkit';
import { initialOrders } from '../../../data/mock/ordersMock';

const initialState = {
  items: initialOrders,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action) {
      state.items.unshift(action.payload);
    },
    clearOrders(state) {
      state.items = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
