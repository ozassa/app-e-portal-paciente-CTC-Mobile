import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { MainTabsParamList } from '@/types/navigation';
import { HomeScreen } from '@/screens/Home/HomeScreen';
import { DashboardScreen } from '@/screens/Dashboard/DashboardScreen';
import { AppointmentsListScreen } from '@/screens/Appointments/AppointmentsListScreen';
import { UnitsListScreen } from '@/screens/Units/UnitsListScreen';
import { ProfileScreen } from '@/screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen as any}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen as any}
        options={{
          tabBarLabel: 'Carteirinha',
          tabBarIcon: ({ color, size }) => (
            <Icon name="card-account-details" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsListScreen as any}
        options={{
          tabBarLabel: 'Consultas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-clock" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Units"
        component={UnitsListScreen as any}
        options={{
          tabBarLabel: 'Unidades',
          tabBarIcon: ({ color, size }) => (
            <Icon name="hospital-building" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen as any}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
