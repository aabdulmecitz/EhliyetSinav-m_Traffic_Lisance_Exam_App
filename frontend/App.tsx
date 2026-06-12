import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n';
import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';
import { RevenueCatKeys } from './src/config/keys';

export default function App() {
  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: RevenueCatKeys.appleApiKey });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: RevenueCatKeys.googleApiKey });
    }
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar />
    </SafeAreaProvider>
  );
}
