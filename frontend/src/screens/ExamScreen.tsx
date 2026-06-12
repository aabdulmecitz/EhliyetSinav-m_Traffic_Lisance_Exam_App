import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useStore, Question } from '../store/useStore';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './DashboardScreen';
import questionsData from '../data/questions.json'; 
import { useTranslation } from 'react-i18next';

type ExamScreenRouteProp = RouteProp<RootStackParamList, 'Exam'>;

export default function ExamScreen() {
  const route = useRoute<ExamScreenRouteProp>();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const mode = route.params?.mode || 'random10';
  
  const { 
    wrongQuestions, 
    addWrongQuestion, 
    removeWrongQuestion,
    incrementTotal,
    incrementCorrect 
  } = useStore();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [localCorrectCount, setLocalCorrectCount] = useState(0);

  useEffect(() => {
    if (mode === 'wrong') {
      setQuestions(wrongQuestions);
    } else if (mode === 'deneme') {
      // Rastgele 50 soru almak için basit bir karıştırma yöntemi
      const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 50) as Question[]);
    } else {
      // random10
      const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 10) as Question[]);
    }
  }, [mode]);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    const currentQuestion = questions[currentIndex];
    const isCorrect = option === currentQuestion.correctAnswer;
    
    incrementTotal();
    if (isCorrect) {
      incrementCorrect();
      setLocalCorrectCount(prev => prev + 1);
      
      if (mode === 'wrong') {
        removeWrongQuestion(currentQuestion.id);
      }
    } else {
      addWrongQuestion(currentQuestion);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      Alert.alert(t('exam_completed_title'), t('exam_completed_desc', { total: questions.length, correct: localCorrectCount }), [
        { text: t('exam_ok'), onPress: () => navigation.goBack() }
      ]);
    }
  };

  if (questions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text>{t('exam_no_questions')}</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const options = ['A', 'B', 'C', 'D'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.counterText}>{t('exam_question_counter', { current: currentIndex + 1, total: questions.length })}</Text>
        <Text style={styles.timerText}>--:--</Text> 
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.kategoriText}>{currentQuestion.category}</Text>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
        {currentQuestion.imageUrl && (
          <Image 
            source={{ uri: currentQuestion.imageUrl }} 
            style={styles.questionImage} 
            resizeMode="contain" 
          />
        )}
      </View>

      <View style={styles.optionsContainer}>
        {options.map((opt) => {
          let btnStyle: any[] = [styles.optionButton];
          let txtStyle: any[] = [styles.optionText];
          
          if (isAnswered) {
            if (opt === currentQuestion.correctAnswer) {
              btnStyle.push(styles.correctOption);
              txtStyle.push(styles.whiteText);
            } else if (opt === selectedOption) {
              btnStyle.push(styles.wrongOption);
              txtStyle.push(styles.whiteText);
            }
          }

          const optionKey = `option${opt}`;
          const optionTextValue = (currentQuestion as any)[optionKey];

          return (
            <TouchableOpacity 
              key={opt}
              style={btnStyle}
              onPress={() => handleAnswer(opt)}
              activeOpacity={0.7}
            >
              <Text style={txtStyle}>
                <Text style={styles.optionLetter}>{opt})</Text> {optionTextValue}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.navButton, !isAnswered && styles.navButtonDisabled]} 
          onPress={handleNext}
          disabled={!isAnswered}
        >
          <Text style={styles.navButtonText}>{currentIndex === questions.length - 1 ? t('exam_finish') : t('exam_next_question')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  timerText: {
    fontSize: 16,
    color: '#E53935',
    fontWeight: 'bold',
  },
  questionContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  kategoriText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 26,
    fontWeight: '500',
  },
  questionImage: {
    width: '100%',
    height: 150,
    marginTop: 15,
    borderRadius: 8,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 56, 
    justifyContent: 'center',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  whiteText: {
    color: '#FFF',
  },
  optionLetter: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto', 
    paddingVertical: 10,
    alignItems: 'flex-end',
  },
  navButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  navButtonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
