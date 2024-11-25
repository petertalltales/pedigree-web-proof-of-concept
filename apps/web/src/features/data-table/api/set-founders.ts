import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client'; // Updated import path

// API function to set founders for all
export const setFounders = async (): Promise<void> => {
  await api.post('api/data/set_founders');
};

// Custom React Hook for mutation
export const useSetFounders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setFounders,
    onSuccess: () => {
      // Invalidate the `tableData` query to refresh data
      queryClient.invalidateQueries({ queryKey: ['tableData'] });
    },
    onError: (error: unknown) => {
      // Handle errors gracefully
      console.error('Error in setFounders mutation:', error);
    },
  });
};
