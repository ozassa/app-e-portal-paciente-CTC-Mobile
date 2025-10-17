import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Screen } from '@/components/layout/Screen';
import { OTPInput } from '@/components/forms/OTPInput';
import { useAuth } from '@/hooks/useAuth';
import { formatCPF } from '@/utils/cpfValidator';

export const TwoFactorScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { verifyTwoFactor, resendOTP } = useAuth();

  const cpf = route.params?.cpf || '';
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleComplete = async (code: string) => {
    setLoading(true);
    try {
      await verifyTwoFactor(cpf, code);
      // Navegação automática será feita pelo AuthContext
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Código inválido');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await resendOTP(cpf, 'sms');
      Alert.alert('Sucesso', 'Código reenviado!');
      setTimer(60);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao reenviar código');
    } finally {
      setResending(false);
    }
  };

  return (
    <Screen padding>
      <View style={styles.container}>
        <Text variant="displaySmall" style={styles.title}>
          Verificação em 2 etapas
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Digite o código enviado para o número cadastrado
        </Text>
        <Text variant="bodyMedium" style={styles.cpf}>
          CPF: {formatCPF(cpf)}
        </Text>

        <OTPInput onComplete={handleComplete} />

        {loading && (
          <Text style={styles.verifying}>Verificando código...</Text>
        )}

        <View style={styles.resendContainer}>
          {timer > 0 ? (
            <Text>Reenviar código em {timer}s</Text>
          ) : (
            <Button
              mode="text"
              onPress={handleResend}
              loading={resending}
              disabled={resending}
            >
              Reenviar código
            </Button>
          )}
        </View>

        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          disabled={loading || resending}
          style={styles.backButton}
        >
          Voltar
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 8,
  },
  cpf: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 32,
  },
  verifying: {
    textAlign: 'center',
    marginTop: 16,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  backButton: {
    marginTop: 16,
  },
});
