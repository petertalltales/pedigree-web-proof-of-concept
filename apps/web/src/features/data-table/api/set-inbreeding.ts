// api/hooks/set-inbreeding.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client';

// Function to perform the mutation
export const setInbreeding = async ({ id }: { id: string }) => {
  const response = await api.post(`/data/set_inbreeding/${id}`);
  return response; // Ensure it returns the API response for downstream use
};

// Hook to manage the mutation
export const useSetInbreeding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setInbreeding,
    onSuccess: () => {
      // Invalidate the `tableData` query by providing it in the appropriate format
      queryClient.invalidateQueries({ queryKey: ['tableData'] });
    },
    onError: (error: unknown) => {
      // Handle errors gracefully
      console.error('Error in setInbreeding mutation:', error);
    },
  });
};
