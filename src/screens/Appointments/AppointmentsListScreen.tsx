import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screen } from '@/components/layout/Screen';
import { Loading } from '@/components/ui/Loading';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppointments } from '@/hooks/useAppointments';
import { formatDateTime } from '@/utils/formatters';

type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';

interface AppointmentType {
  id: string;
  especialidade: string;
  tipo: 'consulta' | 'exame';
  dataHora: string;
  unidade: string;
  profissional?: string;
  status?: AppointmentStatus;
}

const getStatusInfo = (status?: AppointmentStatus) => {
  switch (status) {
    case 'confirmed':
      return { label: 'Confirmado', color: '#059669', icon: 'check-circle' };
    case 'completed':
      return { label: 'Realizado', color: '#6B7280', icon: 'check-all' };
    case 'cancelled':
      return { label: 'Cancelado', color: '#DC2626', icon: 'close-circle' };
    default:
      return { label: 'Agendado', color: '#3B82F6', icon: 'calendar-clock' };
  }
};

const getTypeInfo = (tipo: 'consulta' | 'exame') => {
  if (tipo === 'consulta') {
    return {
      icon: 'stethoscope',
      color: '#8B5CF6',
      bgColor: '#F3E8FF',
      label: 'Consulta',
    };
  }
  return {
    icon: 'flask',
    color: '#EC4899',
    bgColor: '#FCE7F3',
    label: 'Exame',
  };
};

const AppointmentCard = ({ item }: { item: AppointmentType }) => {
  const typeInfo = getTypeInfo(item.tipo);
  const statusInfo = getStatusInfo(item.status);

  return (
    <Card style={styles.appointmentCard}>
      <LinearGradient
        colors={['#FFFFFF', '#F9FAFB']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={[styles.typeIcon, { backgroundColor: typeInfo.bgColor }]}>
              <Icon name={typeInfo.icon} size={24} color={typeInfo.color} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.specialtyText}>{item.especialidade}</Text>
              <Text style={[styles.typeText, { color: typeInfo.color }]}>
                {typeInfo.label}
              </Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
            <Icon name={statusInfo.icon} size={14} color="#FFFFFF" />
            <Text style={styles.statusText}>{statusInfo.label}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Icon name="calendar" size={18} color="#6B7280" />
            <Text style={styles.infoText}>{formatDateTime(item.dataHora)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="hospital-building" size={18} color="#6B7280" />
            <Text style={styles.infoText}>{item.unidade}</Text>
          </View>

          {item.profissional && (
            <View style={styles.infoRow}>
              <Icon name="doctor" size={18} color="#6B7280" />
              <Text style={styles.infoText}>Dr(a). {item.profissional}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Ver detalhes</Text>
          <Icon name="chevron-right" size={20} color="#3B82F6" />
        </TouchableOpacity>
      </LinearGradient>
    </Card>
  );
};

export const AppointmentsListScreen = () => {
  const { data: appointments, isLoading } = useAppointments();

  // Group appointments by date
  const groupedAppointments = useMemo(() => {
    if (!appointments) return { today: [], upcoming: [], past: [] };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return appointments.reduce(
      (acc, appointment) => {
        const appointmentDate = new Date(appointment.dataHora);
        appointmentDate.setHours(0, 0, 0, 0);

        if (appointmentDate.getTime() === today.getTime()) {
          acc.today.push(appointment);
        } else if (appointmentDate >= tomorrow) {
          acc.upcoming.push(appointment);
        } else {
          acc.past.push(appointment);
        }
        return acc;
      },
      { today: [], upcoming: [], past: [] } as {
        today: AppointmentType[];
        upcoming: AppointmentType[];
        past: AppointmentType[];
      }
    );
  }, [appointments]);

  if (isLoading) {
    return <Loading message="Carregando consultas..." />;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <Screen padding>
        <View style={styles.emptyContainer}>
          <LinearGradient
            colors={['#EEF2FF', '#E0E7FF']}
            style={styles.emptyGradient}
          >
            <Icon name="calendar-blank" size={80} color="#6366F1" />
            <Text style={styles.emptyTitle}>Nenhuma consulta agendada</Text>
            <Text style={styles.emptyDescription}>
              Você não possui consultas ou exames agendados no momento
            </Text>
            <TouchableOpacity style={styles.scheduleButton}>
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.scheduleGradient}
              >
                <Icon name="plus" size={20} color="#FFFFFF" />
                <Text style={styles.scheduleButtonText}>Agendar consulta</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={[
          ...(groupedAppointments.today.length > 0
            ? [{ type: 'header', title: 'Hoje' }]
            : []),
          ...groupedAppointments.today.map((item) => ({ type: 'appointment', data: item })),
          ...(groupedAppointments.upcoming.length > 0
            ? [{ type: 'header', title: 'Próximas' }]
            : []),
          ...groupedAppointments.upcoming.map((item) => ({ type: 'appointment', data: item })),
          ...(groupedAppointments.past.length > 0
            ? [{ type: 'header', title: 'Realizadas' }]
            : []),
          ...groupedAppointments.past.map((item) => ({ type: 'appointment', data: item })),
        ]}
        keyExtractor={(item, index) =>
          item.type === 'header' ? `header-${index}` : item.data.id
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          if (item.type === 'header') {
            return (
              <View style={styles.sectionHeader}>
                <View style={styles.sectionLine} />
                <Text style={styles.sectionTitle}>{item.title}</Text>
                <View style={styles.sectionLine} />
              </View>
            );
          }
          return <AppointmentCard item={item.data} />;
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  appointmentCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  specialtyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  cardBody: {
    gap: 10,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 4,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyGradient: {
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  scheduleButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  scheduleGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  scheduleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
