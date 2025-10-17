import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Screen } from '@/components/layout/Screen';
import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/hooks/useAuth';
import { formatCPF, maskCPF } from '@/utils/cpfValidator';

export const DashboardScreen = () => {
  const { user } = useAuth();

  if (!user) {
    return <Loading message="Carregando carteirinha..." />;
  }

  return (
    <Screen scroll padding>
      <Text variant="headlineMedium" style={styles.title}>
        Carteirinha Digital
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.name}>
            {user.nome}
          </Text>
          <View style={styles.info}>
            <Text variant="bodyMedium">CPF: {maskCPF(user.cpf)}</Text>
            <Text variant="bodyMedium">Plano: Plano Básico</Text>
            <Text variant="bodyMedium">Validade: 31/12/2025</Text>
          </View>
        </Card.Content>
      </Card>

      <Text variant="bodySmall" style={styles.footer}>
        Apresente esta carteirinha nas unidades CTC
      </Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  name: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  info: {
    gap: 8,
  },
  footer: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
