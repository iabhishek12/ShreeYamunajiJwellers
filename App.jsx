import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/auth/login';

function App() {
  return (
    <SafeAreaProvider>
      <Login />
    </SafeAreaProvider>
  );
}

export default App;
