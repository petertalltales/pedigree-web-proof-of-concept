import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api-client'; // Adjust the import path
import { Individual } from '../types/Individual';

/**
 * API function to fetch table data.
 * @returns The table data as an array of TableData.
 * @throws Error if the response does not contain a valid array of table data.
 */
export const fetchTableData = async (): Promise<Individual[]> => {
  const response = await api.get('api/data');

  return response.data; // Return the table data directly
};

/**
 * Custom React Hook for fetching table data.
 * Uses React Query to manage the query lifecycle.
 * @returns Query result containing table data.
 */
export const useFetchTableData = () => {
  return useQuery({
    queryKey: ['tableData'], // Unique key for the table data query
    queryFn: fetchTableData, // Query function to fetch table data
    refetchOnWindowFocus: false, // Avoid refetching on window focus
  });
};
