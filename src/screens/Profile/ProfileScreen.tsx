import React from 'react';
import { View, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screen } from '@/components/layout/Screen';
import { useAuth } from '@/hooks/useAuth';
import { maskCPF } from '@/utils/cpfValidator';

const StatCard = ({ icon, value, label, color }: any) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const InfoCard = ({ icon, title, value, iconColor, iconBg }: any) => (
  <View style={styles.infoCard}>
    <View style={[styles.infoIcon, { backgroundColor: iconBg }]}>
      <Icon name={icon} size={20} color={iconColor} />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const MenuOption = ({ icon, title, subtitle, onPress, color, danger }: any) => (
  <TouchableOpacity
    style={styles.menuOption}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.menuIcon, { backgroundColor: danger ? '#FEE2E2' : color + '20' }]}>
      <Icon name={icon} size={22} color={danger ? '#DC2626' : color} />
    </View>
    <View style={styles.menuContent}>
      <Text style={[styles.menuTitle, danger && { color: '#DC2626' }]}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    <Icon name="chevron-right" size={24} color="#9CA3AF" />
  </TouchableOpacity>
);

export const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          onPress: logout,
          style: 'destructive'
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Em breve', 'Funcionalidade de edição de perfil em desenvolvimento');
  };

  const handleNotifications = () => {
    Alert.alert('Em breve', 'Configurações de notificações em desenvolvimento');
  };

  const handleSecurity = () => {
    Alert.alert('Em breve', 'Configurações de segurança em desenvolvimento');
  };

  const handleHelp = () => {
    Alert.alert('Em breve', 'Central de ajuda em desenvolvimento');
  };

  if (!user) return null;

  // Get initials for avatar
  const initials = user.nome
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#3B82F6', '#2563EB', '#1E40AF']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#FFFFFF', '#F3F4F6']}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>{initials}</Text>
            </LinearGradient>
          </View>
          <Text style={styles.userName}>{user.nome}</Text>
          <Text style={styles.userCPF}>{maskCPF(user.cpf)}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Icon name="pencil" size={16} color="#3B82F6" />
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            icon="calendar-check"
            value="12"
            label="Consultas"
            color="#059669"
          />
          <StatCard
            icon="flask"
            value="8"
            label="Exames"
            color="#8B5CF6"
          />
          <StatCard
            icon="heart-pulse"
            value="5"
            label="Procedimentos"
            color="#EC4899"
          />
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <View style={styles.infoCards}>
            <InfoCard
              icon="email"
              title="Email"
              value={user.email || 'Não informado'}
              iconColor="#3B82F6"
              iconBg="#DBEAFE"
            />

            {user.telefone && (
              <InfoCard
                icon="phone"
                title="Telefone"
                value={user.telefone}
                iconColor="#059669"
                iconBg="#D1FAE5"
              />
            )}

            {user.celular && (
              <InfoCard
                icon="cellphone"
                title="Celular"
                value={user.celular}
                iconColor="#8B5CF6"
                iconBg="#F3E8FF"
              />
            )}
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>

          <View style={styles.menuContainer}>
            <MenuOption
              icon="bell"
              title="Notificações"
              subtitle="Gerencie suas notificações"
              onPress={handleNotifications}
              color="#F59E0B"
            />

            <MenuOption
              icon="shield-check"
              title="Segurança"
              subtitle="Senha e autenticação"
              onPress={handleSecurity}
              color="#8B5CF6"
            />

            <MenuOption
              icon="help-circle"
              title="Ajuda e Suporte"
              subtitle="FAQ e atendimento"
              onPress={handleHelp}
              color="#3B82F6"
            />

            <MenuOption
              icon="information"
              title="Sobre o App"
              subtitle="Versão 1.0.0"
              onPress={() => Alert.alert('CTC Mobile', 'Versão 1.0.0\n© 2024 CTC Tech')}
              color="#6B7280"
            />
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Icon name="logout" size={20} color="#DC2626" />
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Portal do Paciente CTC
          </Text>
          <Text style={styles.footerSubtext}>
            Cuidando da sua saúde com tecnologia
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userCPF: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    marginTop: -24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  infoCards: {
    gap: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  logoutContainer: {
    padding: 20,
    paddingTop: 0,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
