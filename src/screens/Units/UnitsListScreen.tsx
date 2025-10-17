import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Screen } from '@/components/layout/Screen';
import { Loading } from '@/components/ui/Loading';
import { EmptyState } from '@/components/ui/EmptyState';
import { useUnits } from '@/hooks/useUnits';

export const UnitsListScreen = () => {
  const { data: units, isLoading } = useUnits();

  if (isLoading) {
    return <Loading message="Carregando unidades..." />;
  }

  if (!units || units.length === 0) {
    return <EmptyState message="Nenhuma unidade encontrada" />;
  }

  return (
    <Screen>
      <FlatList
        data={units}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{item.nome}</Text>
              <Text variant="bodyMedium">{item.endereco}</Text>
              <Text variant="bodySmall">{item.cidade} - {item.estado}</Text>
              {item.telefone && (
                <Text variant="bodySmall">Tel: {item.telefone}</Text>
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
