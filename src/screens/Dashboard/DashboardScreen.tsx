import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screen } from '@/components/layout/Screen';
import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/hooks/useAuth';
import { maskCPF } from '@/utils/cpfValidator';

export const DashboardScreen = () => {
  const { user } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    const toValue = isFlipped ? 0 : 1;

    Animated.timing(flipAnimation, {
      toValue,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  if (!user) {
    return <Loading message="Carregando carteirinha..." />;
  }

  return (
    <Screen scroll padding>
      <Text variant="headlineMedium" style={styles.title}>
        Carteirinha Digital
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Apresente nas unidades CTC
      </Text>

      {/* Card Container */}
      <View style={styles.cardContainer}>
        {/* Frente do Cartão */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ rotateY: frontInterpolate }],
            },
          ]}
        >
          <LinearGradient
            colors={['#9333EA', '#7C3AED', '#6B21A8']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Elementos decorativos */}
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />

            <View style={styles.cardContent}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <Icon name="shield-check" size={20} color="#FFFFFF" />
                  <Text style={styles.headerText}>HEALTHCARD</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Icon name="heart" size={28} color="#FFFFFF" />
                </View>
              </View>

              {/* Middle Section */}
              <View style={styles.middleSection}>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>Premium Plus</Text>
                  <Text style={styles.planType}>Plano de Saúde</Text>
                </View>

                <View style={styles.userInfo}>
                  <Text style={styles.label}>Titular</Text>
                  <Text style={styles.userName}>{user.nome}</Text>
                </View>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <View>
                  <Text style={styles.label}>Matrícula</Text>
                  <Text style={styles.matricula}>{maskCPF(user.cpf)}</Text>
                </View>
                <View style={styles.footerRight}>
                  <Text style={styles.label}>Válido até</Text>
                  <Text style={styles.validity}>12/2025</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Verso do Cartão */}
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              transform: [{ rotateY: backInterpolate }],
            },
          ]}
        >
          <View style={styles.backContent}>
            <View style={styles.colorStripe} />

            <View style={styles.backInfo}>
              <Text style={styles.backTitle}>Dados do Titular</Text>
              <Text style={styles.backSubtitle}>{user.nome}</Text>

              <View style={styles.dataGrid}>
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>CPF</Text>
                  <Text style={styles.dataValue}>{maskCPF(user.cpf)}</Text>
                </View>
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>RG</Text>
                  <Text style={styles.dataValue}>12.345.678-9</Text>
                </View>
              </View>

              <View style={[styles.dataItem, styles.fullWidth]}>
                <Text style={styles.dataLabel}>Data de Nascimento</Text>
                <Text style={styles.dataValue}>15/03/1985</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.contactInfo}>
                <View style={styles.contactItem}>
                  <View style={[styles.contactIcon, styles.phoneIcon]}>
                    <Icon name="phone" size={16} color="#059669" />
                  </View>
                  <View>
                    <Text style={styles.dataLabel}>Telefone</Text>
                    <Text style={styles.dataValue}>(11) 9876-5432</Text>
                  </View>
                </View>

                <View style={styles.contactItem}>
                  <View style={[styles.contactIcon, styles.locationIcon]}>
                    <Icon name="map-marker" size={16} color="#9333EA" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dataLabel}>Endereço</Text>
                    <Text style={styles.dataValue}>Rua das Flores, 123</Text>
                    <Text style={styles.addressDetail}>Centro - São Paulo/SP</Text>
                  </View>
                </View>
              </View>

              <View style={styles.qrCodeContainer}>
                <Icon name="qrcode" size={48} color="#9CA3AF" />
              </View>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Flip Button */}
      <Button
        mode="outlined"
        onPress={flipCard}
        style={styles.flipButton}
        icon="rotate-3d-variant"
        textColor="#3B82F6"
      >
        {isFlipped ? 'Ver frente da carteirinha' : 'Ver verso da carteirinha'}
      </Button>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 24,
    opacity: 0.7,
  },
  cardContainer: {
    height: 480,
    marginBottom: 24,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  cardBack: {
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -64,
    left: -64,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 16,
  },
  middleSection: {
    gap: 24,
  },
  planInfo: {
    gap: 4,
  },
  planName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  planType: {
    fontSize: 16,
    color: '#E9D5FF',
    fontWeight: '500',
  },
  userInfo: {
    gap: 4,
  },
  label: {
    fontSize: 13,
    color: '#E9D5FF',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  matricula: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  validity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  colorStripe: {
    height: 8,
    backgroundColor: '#9333EA',
  },
  backInfo: {
    padding: 24,
  },
  backTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  backSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  dataGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  dataItem: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
  },
  fullWidth: {
    marginBottom: 16,
  },
  dataLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    gap: 12,
  },
  contactIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneIcon: {
    backgroundColor: '#D1FAE5',
  },
  locationIcon: {
    backgroundColor: '#F3E8FF',
  },
  addressDetail: {
    fontSize: 11,
    color: '#6B7280',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  flipButton: {
    borderColor: '#3B82F6',
    borderWidth: 1.5,
    borderRadius: 12,
  },
});
