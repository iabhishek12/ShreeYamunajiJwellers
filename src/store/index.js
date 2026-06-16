import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/store/authSlice';
import { cartReducer } from '../features/cart/store/cartSlice';
import { addressReducer } from '../features/checkout/store/addressSlice';
import { wishlistReducer } from '../features/wishlist/store/wishlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    addressBook: addressReducer,
    wishlist: wishlistReducer,
  },
});
