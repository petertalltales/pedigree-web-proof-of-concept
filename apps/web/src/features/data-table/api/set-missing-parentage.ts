import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client'; // Updated import path

// API function to correct missing parentage
export const setMissingParentage = async (): Promise<void> => {
  await api.post('api/data/set_unknown_fathers');
};

// Custom React Hook for mutation
export const useSetMissingParentage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setMissingParentage,
    onSuccess: () => {
      // Invalidate the `tempData` query to refresh data
      queryClient.invalidateQueries({ queryKey: ['tableData'] });
    },
    onError: (error: unknown) => {
      // Handle errors gracefully
      console.error('Error in setMissingParentage mutation:', error);
    },
  });
};
