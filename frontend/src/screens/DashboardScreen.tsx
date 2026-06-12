import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore } from '../store/useStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

export type RootStackParamList = {
  MainTabs: undefined;
  Exam: { mode: 'random10' | 'wrong' | 'deneme' };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function DashboardScreen() {
  const { totalQuestionsAnswered, correctAnswers, wrongQuestions } = useStore();
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const successRate = totalQuestionsAnswered > 0 
    ? Math.round((correctAnswers / totalQuestionsAnswered) * 100) 
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('dashboard_title')}</Text>
      
      {/* Stats Card */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>{t('dashboard_progress_title')}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${successRate}%` }]} />
        </View>
        <Text style={styles.statsText}>
          {t('dashboard_success_format', { rate: successRate, correct: correctAnswers, total: totalQuestionsAnswered })}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Exam', { mode: 'random10' })}
        >
          <Text style={styles.primaryButtonText}>{t('dashboard_start_exam')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Exam', { mode: 'wrong' })}
          disabled={wrongQuestions.length === 0}
        >
          <Text style={styles.secondaryButtonText}>
            {t('dashboard_wrong_questions', { count: wrongQuestions.length })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 30,
  },
  statsCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 40,
  },
  statsTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  statsText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'right',
  },
  buttonContainer: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 56,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 56,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
