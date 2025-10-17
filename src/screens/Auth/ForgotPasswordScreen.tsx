import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@/components/layout/Screen';
import { formatCPF, validateCPF, cleanCPF } from '@/utils/cpfValidator';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCPFChange = (text: string) => {
    const cleaned = cleanCPF(text);
    setCpf(formatCPF(cleaned));
  };

  const handleSubmit = async () => {
    const cleanedCPF = cleanCPF(cpf);

    if (!validateCPF(cleanedCPF)) {
      Alert.alert('Erro', 'CPF inválido');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implementar forgot password
      Alert.alert(
        'Sucesso',
        'Enviamos um código para seu telefone cadastrado',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao enviar código');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll padding>
      <View style={styles.container}>
        <Text variant="displaySmall" style={styles.title}>
          Esqueceu sua senha?
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Digite seu CPF para receber um código de recuperação
        </Text>

        <TextInput
          label="CPF"
          value={cpf}
          onChangeText={handleCPFChange}
          keyboardType="numeric"
          maxLength={14}
          disabled={loading}
          mode="outlined"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Enviar código
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          Voltar ao login
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 40,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 8,
  },
});
