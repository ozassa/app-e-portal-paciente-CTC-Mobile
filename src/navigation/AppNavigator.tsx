import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { AuthStack } from './AuthStack';
import { RootStack } from './RootStack';
import { Loading } from '@/components/ui/Loading';

export const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading message="Carregando..." />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
