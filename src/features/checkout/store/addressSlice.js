import { createSlice } from '@reduxjs/toolkit';
import { checkoutAddresses } from '../../../data/mock/checkoutMock';

const initialState = {
  addresses: checkoutAddresses,
  selectedAddressId: checkoutAddresses[0]?.id ?? null,
};

const selectFallbackAddress = state => {
  if (!state.addresses.some(address => address.id === state.selectedAddressId)) {
    state.selectedAddressId = state.addresses[0]?.id ?? null;
  }
};

const addressSlice = createSlice({
  name: 'addressBook',
  initialState,
  reducers: {
    addAddress(state, action) {
      state.addresses.push(action.payload);
      state.selectedAddressId = action.payload.id;
    },
    updateAddress(state, action) {
      const index = state.addresses.findIndex(address => address.id === action.payload.id);

      if (index >= 0) {
        state.addresses[index] = action.payload;
      }
    },
    deleteAddress(state, action) {
      state.addresses = state.addresses.filter(address => address.id !== action.payload);
      selectFallbackAddress(state);
    },
    selectAddress(state, action) {
      state.selectedAddressId = action.payload;
      selectFallbackAddress(state);
    },
  },
});

export const { addAddress, deleteAddress, selectAddress, updateAddress } =
  addressSlice.actions;

export const addressReducer = addressSlice.reducer;
