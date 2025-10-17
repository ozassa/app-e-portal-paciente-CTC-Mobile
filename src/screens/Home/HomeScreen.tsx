import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screen } from '@/components/layout/Screen';
import { useAuth } from '@/hooks/useAuth';
import type { RootStackParamList, MainTabsParamList } from '@/types/navigation';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();

  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnims = useRef([
    new Animated.Value(0.8),
    new Animated.Value(0.8),
    new Animated.Value(0.8),
  ]).current;

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Animar cards em sequência
    Animated.stagger(
      100,
      scaleAnims.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  const quickActions = [
    {
      title: 'Carteirinha',
      screen: 'Dashboard',
      icon: 'card-account-details',
      gradient: ['#9333EA', '#7C3AED'],
      iconBg: 'rgba(147, 51, 234, 0.15)',
    },
    {
      title: 'Consultas',
      screen: 'Appointments',
      icon: 'calendar-clock',
      gradient: ['#3B82F6', '#2563EB'],
      iconBg: 'rgba(59, 130, 246, 0.15)',
    },
    {
      title: 'Unidades',
      screen: 'Units',
      icon: 'hospital-building',
      gradient: ['#10B981', '#059669'],
      iconBg: 'rgba(16, 185, 129, 0.15)',
    },
  ];

  const stats = [
    { label: 'Consultas', value: '12', icon: 'calendar-check', color: '#3B82F6' },
    { label: 'Exames', value: '8', icon: 'flask', color: '#8B5CF6' },
  ];

  return (
    <Screen scroll padding>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text variant="headlineLarge" style={styles.greeting}>
          Olá, {user?.nome?.split(' ')[0]}! 👋
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Bem-vindo ao Portal CTC
        </Text>
      </Animated.View>

      {/* Estatísticas Rápidas */}
      <Animated.View style={[styles.statsContainer, { opacity: fadeAnim }]}>
        {stats.map((stat, index) => (
          <View key={stat.label} style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
              <Icon name={stat.icon} size={24} color={stat.color} />
            </View>
            <Text variant="headlineMedium" style={styles.statValue}>
              {stat.value}
            </Text>
            <Text variant="bodyMedium" style={styles.statLabel}>
              {stat.label}
            </Text>
          </View>
        ))}
      </Animated.View>

      {/* Acesso Rápido */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Acesso Rápido
        </Text>

        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <Animated.View
              key={action.title}
              style={[
                styles.quickActionWrapper,
                {
                  transform: [{ scale: scaleAnims[index] }],
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate(action.screen)}
              >
                <LinearGradient
                  colors={action.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickActionCard}
                >
                  <View style={[styles.quickActionIconContainer, { backgroundColor: action.iconBg }]}>
                    <Icon name={action.icon} size={32} color="#FFFFFF" />
                  </View>
                  <Text variant="titleMedium" style={styles.quickActionTitle}>
                    {action.title}
                  </Text>
                  <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.8)" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Card de Ação - Agendamento */}
      <Animated.View style={[{ opacity: fadeAnim }]}>
        <Card style={styles.actionCard}>
          <LinearGradient
            colors={['#F0F9FF', '#E0F2FE']}
            style={styles.actionCardGradient}
          >
            <View style={styles.actionCardContent}>
              <View style={styles.actionCardIcon}>
                <Icon name="calendar-plus" size={32} color="#0284C7" />
              </View>
              <View style={styles.actionCardText}>
                <Text variant="titleMedium" style={styles.actionCardTitle}>
                  Precisa agendar?
                </Text>
                <Text variant="bodyMedium" style={styles.actionCardSubtitle}>
                  Consultas e exames disponíveis
                </Text>
              </View>
              <TouchableOpacity
                style={styles.actionCardButton}
                onPress={() => navigation.navigate('ScheduleAppointment')}
              >
                <Icon name="arrow-right" size={20} color="#0284C7" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Card>
      </Animated.View>

      {/* Card de Ação - Resultados */}
      <Animated.View style={[{ opacity: fadeAnim }]}>
        <Card style={styles.actionCard}>
          <LinearGradient
            colors={['#F0FDF4', '#DCFCE7']}
            style={styles.actionCardGradient}
          >
            <View style={styles.actionCardContent}>
              <View style={[styles.actionCardIcon, { backgroundColor: '#FFFFFF' }]}>
                <Icon name="flask-outline" size={32} color="#059669" />
              </View>
              <View style={styles.actionCardText}>
                <Text variant="titleMedium" style={[styles.actionCardTitle, { color: '#065F46' }]}>
                  Resultados de Exames
                </Text>
                <Text variant="bodyMedium" style={[styles.actionCardSubtitle, { color: '#047857' }]}>
                  Veja seus laudos e histórico
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.actionCardButton, { backgroundColor: '#FFFFFF' }]}
                onPress={() => navigation.navigate('ExamResults')}
              >
                <Icon name="arrow-right" size={20} color="#059669" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Card>
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  greeting: {
    marginBottom: 4,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    color: '#6B7280',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 13,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
    color: '#111827',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionWrapper: {
    width: CARD_WIDTH,
  },
  quickActionCard: {
    borderRadius: 16,
    padding: 20,
    minHeight: 140,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  quickActionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  actionCard: {
    marginBottom: 24,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  actionCardGradient: {
    borderRadius: 16,
    padding: 20,
  },
  actionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionCardText: {
    flex: 1,
  },
  actionCardTitle: {
    color: '#0C4A6E',
    fontWeight: '600',
    marginBottom: 4,
  },
  actionCardSubtitle: {
    color: '#0369A1',
    fontSize: 13,
  },
  actionCardButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
