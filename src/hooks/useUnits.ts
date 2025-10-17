import { useQuery } from '@tanstack/react-query';
import { unitService } from '@/services/unitService';

export const useUnits = () => {
  return useQuery({
    queryKey: ['units'],
    queryFn: () => unitService.getUnits(),
  });
};
