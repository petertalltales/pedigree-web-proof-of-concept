import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client'; // Updated import path

/**
 * API function to set death dates.
 * @returns A promise that resolves when the operation is complete.
 */
export const setDeathDates = async (): Promise<void> => {
  await api.post('api/data/set_death_dates');
};

/**
 * Custom React Hook for setting death dates.
 * @returns The mutation object from React Query.
 */
export const useSetDeathDates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDeathDates,
    onSuccess: () => {
      // Invalidate the `tableData` query to refresh data
      queryClient.invalidateQueries({ queryKey: ['tableData'] });
    },
    onError: (error: unknown) => {
      // Handle errors gracefully
      console.error('Error in setDeathDates mutation:', error);
    },
  });
};
