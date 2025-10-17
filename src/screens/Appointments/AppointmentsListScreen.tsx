import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Screen } from '@/components/layout/Screen';
import { Loading } from '@/components/ui/Loading';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppointments } from '@/hooks/useAppointments';
import { formatDateTime } from '@/utils/formatters';

export const AppointmentsListScreen = () => {
  const { data: appointments, isLoading } = useAppointments();

  if (isLoading) {
    return <Loading message="Carregando consultas..." />;
  }

  if (!appointments || appointments.length === 0) {
    return <EmptyState message="Nenhuma consulta agendada" description="Você não possui consultas agendadas no momento" />;
  }

  return (
    <Screen>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{item.especialidade}</Text>
              <Text variant="bodyMedium">{item.tipo === 'consulta' ? 'Consulta' : 'Exame'}</Text>
              <Text variant="bodySmall">{formatDateTime(item.dataHora)}</Text>
              <Text variant="bodySmall">{item.unidade}</Text>
              {item.profissional && (
                <Text variant="bodySmall">Dr(a). {item.profissional}</Text>
              )}
            </Card.Content>
          </Card>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  card: {
    marginBottom: 12,
  },
});
