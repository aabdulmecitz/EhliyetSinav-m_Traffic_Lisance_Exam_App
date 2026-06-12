import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { RevenueCatKeys } from '../config/keys';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { isVip, setVip, resetStats } = useStore();
  
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        console.error("Error fetching offerings", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOfferings();
  }, []);

  const purchasePackage = async (pack: PurchasesPackage) => {
    try {
      setIsPurchasing(true);
      const { customerInfo } = await Purchases.purchasePackage(pack);
      if (typeof customerInfo.entitlements.active[RevenueCatKeys.entitlementId] !== "undefined") {
        setVip(true);
        Alert.alert(t('vip_success_title', 'Success'), t('vip_success_desc', 'You are now a VIP member. Ads are removed.'));
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert(t('vip_error_title', 'Error'), e.message);
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const restorePurchases = async () => {
    try {
      setIsPurchasing(true);
      const customerInfo = await Purchases.restorePurchases();
      if (typeof customerInfo.entitlements.active[RevenueCatKeys.entitlementId] !== "undefined") {
        setVip(true);
        Alert.alert(t('vip_restored_title', 'Restored'), t('vip_restored_desc', 'Your purchases have been restored.'));
      } else {
        Alert.alert(t('vip_not_found', 'No active subscription found.'));
      }
    } catch (e: any) {
      Alert.alert(t('vip_error_title', 'Error'), e.message);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleResetStats = () => {
    Alert.alert(
      t('profile_reset_title', 'Reset Statistics'),
      t('profile_reset_desc', 'Are you sure you want to reset all your statistics and wrong questions?'),
      [
        { text: t('exam_ok', 'OK'), onPress: () => resetStats() },
        { text: t('cancel', 'Cancel'), style: 'cancel' }
      ]
    );
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(nextLang);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('profile_title')}</Text>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile_settings', 'Settings')}</Text>
        <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
          <Text style={styles.buttonText}>
            {t('profile_change_lang', 'Change Language')} ({i18n.language.toUpperCase()})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={handleResetStats}>
          <Text style={[styles.buttonText, styles.dangerText]}>
            {t('profile_reset_stats', 'Reset All Statistics')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Premium Section */}
      <View style={styles.vipSection}>
        <Text style={styles.vipTitle}>
          {isVip ? t('vip_status_active', '👑 VIP Member') : t('vip_status_inactive', 'Remove Ads')}
        </Text>
        
        {isVip ? (
          <Text style={styles.vipDesc}>
            {t('vip_enjoy', 'Thank you for your support! Enjoy an ad-free experience.')}
          </Text>
        ) : (
          <>
            <Text style={styles.vipDesc}>
              {t('vip_pitch', 'Support us and enjoy a completely ad-free experience. Cancel anytime.')}
            </Text>

            {isLoading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : packages.map((pack) => (
              <TouchableOpacity 
                key={pack.identifier} 
                style={styles.purchaseButton}
                onPress={() => purchasePackage(pack)}
                disabled={isPurchasing}
              >
                <Text style={styles.purchaseButtonText}>
                  {pack.product.title} - {pack.product.priceString}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.restoreButton} onPress={restorePurchases} disabled={isPurchasing}>
              <Text style={styles.restoreButtonText}>{t('vip_restore', 'Restore Purchases')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  section: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  dangerButton: {
    backgroundColor: '#FFEBEE',
  },
  dangerText: {
    color: '#D32F2F',
  },
  vipSection: {
    backgroundColor: '#007AFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  vipTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  vipDesc: {
    fontSize: 15,
    color: '#E6F4FE',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  purchaseButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  purchaseButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  restoreButton: {
    padding: 10,
  },
  restoreButtonText: {
    color: '#E6F4FE',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
