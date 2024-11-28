// set-inbreeding-for-all.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client'; // Updated import path

// API function to set InbreedingForAll for all
export const setInbreedingForAll = async (): Promise<void> => {
  console.log('API called: /data/set_inbreeding/all');
  await api.post('api/data/set_inbreeding/all');
};

// Custom React Hook for mutation
export const useSetInbreedingForAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setInbreedingForAll,
    onSuccess: () => {
      // Invalidate the `tableData` query to refresh data
      queryClient.invalidateQueries({ queryKey: ['tableData'], exact: true });
    },
    onError: (error: unknown) => {
      // Handle errors gracefully
      console.error('Error in setInbreedingForAll mutation:', error);
    },
  });
};
