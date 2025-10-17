import api from './api';
import type { Unit } from '@/types/unit';

export const unitService = {
  async getUnits(): Promise<Unit[]> {
    const response = await api.get<Unit[]>('/units');
    return response.data;
  },

  async getUnitById(id: string): Promise<Unit> {
    const response = await api.get<Unit>(`/units/${id}`);
    return response.data;
  },
};
