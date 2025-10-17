import { useQuery } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointmentService';

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => appointmentService.getAppointments(),
  });
};
