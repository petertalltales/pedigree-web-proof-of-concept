// Hooks look pretty good, but the components in the Table are not taking advantaged of them properly.
// Propdrilling or context, or any type of state management would be great here, it's what I usually do
// React Query is a godsend though.

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client';

// API function to clear data
export const clearTableData = async (): Promise<void> => {
  await api.delete('api/data');
};

// Custom React Hook for clearData mutation
export const useClearTableData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearTableData,
    onSuccess: () => {
      // Invalidate the `tableData` query to refresh data
      queryClient.invalidateQueries({ queryKey: ['tableData'] });
    },
    onError: (error: unknown) => {
      // Handle errors gracefully
      console.error('Error in clearData mutation:', error);
    },
  });
};
