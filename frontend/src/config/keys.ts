import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

// IMPORTANT: Replace these with your actual App and Ad Unit IDs before publishing.
// If it is highly critical or a secret key, you should use environment variables (e.g. react-native-dotenv).
// For public IDs like RevenueCat public API keys or AdMob unit IDs, it is generally safe to leave them here.

export const AdMobKeys = {
  // Replace these with your real AdMob Ad Unit IDs
  bannerAdUnitId: __DEV__ 
    ? TestIds.BANNER 
    : Platform.OS === 'ios' 
      ? 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx' // iOS Banner ID
      : 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx', // Android Banner ID
      
  interstitialAdUnitId: __DEV__ 
    ? TestIds.INTERSTITIAL 
    : Platform.OS === 'ios' 
      ? 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx' // iOS Interstitial ID
      : 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx', // Android Interstitial ID
};

export const RevenueCatKeys = {
  // Public SDK Keys from RevenueCat Dashboard
  appleApiKey: 'appl_xxxxxxxxxxxxxxxxxxxxxxxx',
  googleApiKey: 'goog_xxxxxxxxxxxxxxxxxxxxxxxx',
  entitlementId: 'vip_access' // e.g. "Premium" or "vip_access"
};
