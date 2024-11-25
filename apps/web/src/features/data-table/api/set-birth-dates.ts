import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client'; // Updated import path

// API function to set birth dates
export const setBirthDates = async (): Promise<void> => {
  await api.post('api/data/set_birth_dates');
};

// Custom React Hook for setBirthDates mutation
export const useSetBirthDates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setBirthDates,
    onSuccess: () => {
      // Invalidate the `tableData` query to refresh data
      queryClient.invalidateQueries({ queryKey: ['tableData'] });
    },
    onError: (error: unknown) => {
      // Handle errors gracefully
      console.error('Error in setBirthDates mutation:', error);
    },
  });
};
