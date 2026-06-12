import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { AdMobKeys } from '../config/keys';
import { useStore } from '../store/useStore';

export default function AdBanner() {
  const isVip = useStore((state) => state.isVip);

  // VIP kullanıcılara reklam gösterme
  if (isVip) return null;

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={AdMobKeys.bannerAdUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#F5F7FA', // Match app background
  },
});
