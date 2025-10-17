import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, List, Button, Divider } from 'react-native-paper';
import { Screen } from '@/components/layout/Screen';
import { useAuth } from '@/hooks/useAuth';
import { formatCPF } from '@/utils/cpfValidator';

export const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: logout, style: 'destructive' },
      ]
    );
  };

  if (!user) return null;

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text variant="headlineMedium">{user.nome}</Text>
        <Text variant="bodyMedium">{formatCPF(user.cpf)}</Text>
        <Text variant="bodyMedium">{user.email}</Text>
      </View>

      <Divider />

      <List.Section>
        <List.Subheader>Informações</List.Subheader>
        {user.telefone && (
          <List.Item
            title="Telefone"
            description={user.telefone}
            left={(props) => <List.Icon {...props} icon="phone" />}
          />
        )}
        {user.celular && (
          <List.Item
            title="Celular"
            description={user.celular}
            left={(props) => <List.Icon {...props} icon="cellphone" />}
          />
        )}
      </List.Section>

      <Divider />

      <View style={styles.actions}>
        <Button mode="outlined" onPress={handleLogout} style={styles.button}>
          Sair
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    gap: 4,
  },
  actions: {
    padding: 20,
  },
  button: {
    marginBottom: 12,
  },
});
