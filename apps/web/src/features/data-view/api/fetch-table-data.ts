// src/features/your-feature/hooks/useFetchTableData.ts

import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api-client';
import { Individual } from '../../..//types/Individual';
import { mapToIndividual } from '../../../lib/map-to-individual';

/**
 * API function to fetch table data.
 * @returns The table data as an array of Individual.
 * @throws Error if the response does not contain a valid array of table data.
 */
export const fetchTableData = async (): Promise<Individual[]> => {
  const response = await api.get('api/data');

  if (!Array.isArray(response.data)) {
    throw new Error('Invalid data format: expected an array');
  }

  // Map each raw data item to an Individual
  return response.data.map((item) => mapToIndividual(item));
};

/**
 * Custom React Hook for fetching table data.
 * Uses React Query to manage the query lifecycle.
 * @returns Query result containing table data.
 */
export const useFetchTableData = () => {
  return useQuery<Individual[], Error>({
    queryKey: ['tableData'], // Unique key for the table data query
    queryFn: fetchTableData, // Query function to fetch table data
    refetchOnWindowFocus: false, // Avoid refetching on window focus
  });
};
