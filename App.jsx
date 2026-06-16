import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import Login from './src/auth/login';
// import OtpScreen from './src/auth/otp';
import HomeScreen from './src/features/home/screens/HomeScreen';
import CategoriesScreen from './src/features/categories/screens/CategoriesScreen';
import ProductDetailsScreen from './src/features/product/screens/ProductDetailsScreen';
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
            {/* <Stack.Screen name="Login" component={Login} /> */}
            {/* <Stack.Screen name="Otp" component={OtpScreen} /> */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
