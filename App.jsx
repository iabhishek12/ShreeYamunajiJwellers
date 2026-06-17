import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/auth/login';
import OtpScreen from './src/auth/otp';
import HomeScreen from './src/features/home/screens/HomeScreen';
import CategoriesScreen from './src/features/categories/screens/CategoriesScreen';
import ProductDetailsScreen from './src/features/product/screens/ProductDetailsScreen';
import CartScreen from './src/features/cart/screens/CartScreen';
import CheckoutScreen from './src/features/checkout/screens/CheckoutScreen';
import AddressBookScreen from './src/features/checkout/screens/AddressBookScreen';
import WishlistScreen from './src/features/wishlist/screens/WishlistScreen';
import MenuInfoScreen from './src/features/menu/screens/MenuInfoScreen';
import { store } from './src/store';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Otp" component={OtpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="AddressBook" component={AddressBookScreen} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name="Profile" component={MenuInfoScreen} />
            <Stack.Screen name="Settings" component={MenuInfoScreen} />
            <Stack.Screen name="TermsConditions" component={MenuInfoScreen} />
            <Stack.Screen name="PrivacyPolicy" component={MenuInfoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
