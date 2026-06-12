import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import ExamsListScreen from '../screens/ExamsListScreen';
import SignsScreen from '../screens/SignsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExamScreen from '../screens/ExamScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator
function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // Aktif sekme rengi
        tabBarInactiveTintColor: '#8E8E93',
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ title: t('tabs_home') }} 
      />
      <Tab.Screen 
        name="ExamsList" 
        component={ExamsListScreen} 
        options={{ title: t('tabs_exams') }} 
      />
      <Tab.Screen 
        name="Signs" 
        component={SignsScreen} 
        options={{ title: t('tabs_signs') }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: t('tabs_profile') }} 
      />
    </Tab.Navigator>
  );
}

// Ana Stack Navigator
export default function AppNavigator() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Exam" 
          component={ExamScreen} 
          options={{ 
            title: t('exam_header_title'),
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: '#fff'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
