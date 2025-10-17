import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@/components/layout/Screen';
import { useAuth } from '@/hooks/useAuth';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const quickActions = [
    { title: 'Carteirinha', screen: 'Dashboard', icon: 'card-account-details' },
    { title: 'Consultas', screen: 'Appointments', icon: 'calendar-clock' },
    { title: 'Unidades', screen: 'Units', icon: 'hospital-building' },
  ];

  return (
    <Screen scroll padding>
      <Text variant="headlineMedium" style={styles.greeting}>
        Olá, {user?.nome?.split(' ')[0]}!
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Bem-vindo ao Portal CTC
      </Text>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Acesso Rápido
        </Text>
        {quickActions.map((action) => (
          <Card key={action.title} style={styles.card} onPress={() => navigation.navigate(action.screen)}>
            <Card.Content>
              <Text variant="titleMedium">{action.title}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  greeting: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  card: {
    marginBottom: 12,
  },
});
