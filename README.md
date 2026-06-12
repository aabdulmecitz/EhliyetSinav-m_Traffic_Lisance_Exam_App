# Ehliyet Cepte: Yeni Müfredat & Sınav Soruları

A comprehensive mobile application designed to help users prepare for the Turkish driving license exam. Developed using React Native (Expo), the app provides a fast user experience and an architecture that works mostly offline (excluding image loading).

## Features
- **Clean and Modern UI**: Modern design featuring light gray, white, and a trust-inspiring blue (#007AFF) palette.
- **Exam Modes**:
  - Mock exams with 10 or 50 randomly selected questions.
  - A special mode to re-solve previously incorrect answers.
- **Traffic Signs**: A categorized list of all traffic signs along with a live search feature.
- **Statistics Tracking**: Real-time tracking of total questions solved, correct/incorrect ratios, and success percentage using Zustand & AsyncStorage.
- **Localization (i18n)**: Supports Turkish (Default) and English.
- **Monetization (WIP)**: Integration with Google AdMob for banner and interstitial ads, and RevenueCat for a VIP ad-free subscription.

## Technologies Used
- **Framework**: React Native (Expo)
- **State Management**: Zustand
- **Local Storage**: AsyncStorage (Zustand Persist Middleware)
- **Navigation**: React Navigation (Bottom Tabs & Native Stack)
- **Localization**: i18next & react-i18next
- **Monetization**: react-native-google-mobile-ads, react-native-purchases

## Setup & Running

Install dependencies:
```bash
cd frontend
npm install
```

Start the development server:
```bash
npx expo start
```

*Note: Since the app uses custom native modules for Ads and In-App Purchases, you must build a custom dev client (e.g., using `npx expo run:android`) instead of the standard Expo Go app.*
