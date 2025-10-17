import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { AuthStackParamList } from '@/types/navigation';
import { LoginScreen } from '@/screens/Auth/LoginScreen';
import { TwoFactorScreen } from '@/screens/Auth/TwoFactorScreen';
import { ForgotPasswordScreen } from '@/screens/Auth/ForgotPasswordScreen';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen as any} />
      <Stack.Screen name="TwoFactor" component={TwoFactorScreen as any} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen as any} />
    </Stack.Navigator>
  );
};
