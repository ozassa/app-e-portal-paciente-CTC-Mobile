import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { TextInput, Button, Text, HelperText, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '@/hooks/useAuth';
import { formatCPF, validateCPF, cleanCPF } from '@/utils/cpfValidator';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const { login } = useAuth();
  const theme = useTheme();

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

  const openPrivacyPolicy = () => {
    Linking.openURL('https://ctctech.com.br/politica-de-privacidade/');
  };

  return (
    <LinearGradient
      colors={['#3B82F6', '#2563EB', '#1E40AF']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>CTC</Text>
            </View>
          </View>

          {/* Welcome Card */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.welcomeTitle}>Bem-vindo!</Text>
              <Text style={styles.welcomeSubtitle}>
                Digite os dados para acessar o aplicativo
              </Text>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>CPF</Text>
                  <TextInput
                    value={cpf}
                    onChangeText={handleCPFChange}
                    placeholder="000.000.000-00"
                    keyboardType="numeric"
                    maxLength={14}
                    error={!!cpfError}
                    disabled={loading}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#E5E7EB"
                    activeOutlineColor={theme.colors.primary}
                    outlineStyle={styles.inputOutline}
                  />
                  <HelperText type="error" visible={!!cpfError}>
                    {cpfError}
                  </HelperText>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Senha</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="000000"
                    secureTextEntry={!showPassword}
                    disabled={loading}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#E5E7EB"
                    activeOutlineColor={theme.colors.primary}
                    outlineStyle={styles.inputOutline}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                    disabled={loading}
                    style={styles.forgotButton}
                  >
                    <Text style={styles.forgotText}>Esqueci minha senha</Text>
                  </TouchableOpacity>
                </View>

                <Button
                  mode="contained"
                  onPress={handleLogin}
                  loading={loading}
                  disabled={loading}
                  style={styles.loginButton}
                  contentStyle={styles.loginButtonContent}
                  labelStyle={styles.loginButtonLabel}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Não consegue acessar o aplicativo?
                  </Text>
                  <Text style={styles.footerText}>
                    Dirija-se a unidade CTCtech mais próxima
                  </Text>

                  <TouchableOpacity onPress={openPrivacyPolicy} style={styles.privacyLink}>
                    <Text style={styles.privacyText}>Política de Privacidade</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardContent: {
    padding: 32,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    gap: 8,
  },
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  inputOutline: {
    borderRadius: 12,
    borderWidth: 1.5,
  },
  forgotButton: {
    alignSelf: 'center',
    marginTop: 8,
  },
  forgotText: {
    fontSize: 14,
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginTop: 40,
    borderRadius: 12,
  },
  loginButtonContent: {
    height: 56,
  },
  loginButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
  privacyLink: {
    marginTop: 8,
  },
  privacyText: {
    fontSize: 13,
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
});
