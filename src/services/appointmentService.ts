import api from './api';
import type { Appointment } from '@/types/appointment';

export const appointmentService = {
  async getAppointments(): Promise<Appointment[]> {
    const response = await api.get<Appointment[]>('/appointments');
    return response.data;
  },

  async getAppointmentById(id: string): Promise<Appointment> {
    const response = await api.get<Appointment>(`/appointments/${id}`);
    return response.data;
  },
};
