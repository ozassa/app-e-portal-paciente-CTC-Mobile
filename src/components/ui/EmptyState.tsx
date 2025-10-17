import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface EmptyStateProps {
  message: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, description }) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.message}>{message}</Text>
      {description && <Text variant="bodyMedium" style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
