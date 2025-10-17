import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@/components/layout/Screen';
import { useAuth } from '@/hooks/useAuth';
import { formatCPF, validateCPF, cleanCPF } from '@/utils/cpfValidator';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const { login } = useAuth();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [cpfError, setCpfError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCPFChange = (text: string) => {
    const cleaned = cleanCPF(text);
    setCpf(formatCPF(cleaned));
    setCpfError('');
  };

  const handleLogin = async () => {
    const cleanedCPF = cleanCPF(cpf);

    if (!validateCPF(cleanedCPF)) {
      setCpfError('CPF inválido');
      return;
    }

    if (!password) {
      Alert.alert('Erro', 'Digite sua senha');
      return;
    }

    setLoading(true);
    try {
      const result = await login(cleanedCPF, password);

      if (result.requiresTwoFactor) {
        navigation.navigate('TwoFactor', { cpf: cleanedCPF });
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll padding>
      <View style={styles.container}>
        <Text variant="displayMedium" style={styles.title}>
          Portal CTC
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Bem-vindo! Faça login para continuar
        </Text>

        <View style={styles.form}>
          <TextInput
            label="CPF"
            value={cpf}
            onChangeText={handleCPFChange}
            keyboardType="numeric"
            maxLength={14}
            error={!!cpfError}
            disabled={loading}
            mode="outlined"
            style={styles.input}
          />
          <HelperText type="error" visible={!!cpfError}>
            {cpfError}
          </HelperText>

          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            disabled={loading}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Entrar
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('ForgotPassword')}
            disabled={loading}
          >
            Esqueci minha senha
          </Button>
        </View>
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
  form: {
    gap: 8,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    marginBottom: 8,
  },
});
