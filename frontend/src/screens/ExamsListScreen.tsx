import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from './DashboardScreen'; 
import AdBanner from '../components/AdBanner';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function ExamsListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const examModes = [
    {
      id: 'deneme',
      title: t('exams_mock_title'),
      description: t('exams_mock_desc'),
      color: '#007AFF'
    },
    {
      id: 'yanlislar',
      title: t('exams_wrong_title'),
      description: t('exams_wrong_desc'),
      color: '#FF3B30'
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {examModes.map(mode => (
          <TouchableOpacity 
            key={mode.id}
            style={[styles.card, { borderLeftColor: mode.color }]}
            onPress={() => navigation.navigate('Exam', { mode: mode.id as any })}
          >
            <Text style={[styles.cardTitle, { color: mode.color }]}>{mode.title}</Text>
            <Text style={styles.cardDesc}>{mode.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 20,
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  }
});
