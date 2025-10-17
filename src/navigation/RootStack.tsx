import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/navigation';
import { MainTabs } from './MainTabs';
import { ScheduleAppointmentScreen } from '@/screens/Appointments/ScheduleAppointmentScreen';
import { ExamResultsScreen } from '@/screens/ExamResults/ExamResultsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="ScheduleAppointment"
        component={ScheduleAppointmentScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ExamResults"
        component={ExamResultsScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
