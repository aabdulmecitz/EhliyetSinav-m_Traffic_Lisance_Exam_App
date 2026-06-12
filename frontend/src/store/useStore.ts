import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Question {
  id: string;
  category: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  imageUrl: string | null;
}

interface AppState {
  totalQuestionsAnswered: number;
  correctAnswers: number;
  wrongQuestions: Question[];
  addWrongQuestion: (question: Question) => void;
  removeWrongQuestion: (questionId: string) => void;
  incrementTotal: () => void;
  incrementCorrect: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      wrongQuestions: [],
      
      addWrongQuestion: (question) => set((state) => {
        // Zaten ekliyse tekrar ekleme
        const exists = state.wrongQuestions.some((q) => q.id === question.id);
        if (exists) return state;
        return { wrongQuestions: [...state.wrongQuestions, question] };
      }),
      
      removeWrongQuestion: (questionId) => set((state) => ({
        wrongQuestions: state.wrongQuestions.filter((q) => q.id !== questionId)
      })),
      
      incrementTotal: () => set((state) => ({
        totalQuestionsAnswered: state.totalQuestionsAnswered + 1
      })),
      
      incrementCorrect: () => set((state) => ({
        correctAnswers: state.correctAnswers + 1
      }))
    }),
    {
      name: 'ehliyet-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
