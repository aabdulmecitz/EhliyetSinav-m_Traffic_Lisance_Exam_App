import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n'; // Import i18n configuration

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar />
    </SafeAreaProvider>
  );
}
