import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client'; // Updated import path

/**
 * API function to upload a CSV file.
 * @param file - The CSV file to upload.
 * @returns The response data from the backend.
 */
export const uploadCSV = async (file: File): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('api/upload/csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensures correct handling of the file upload
      },
    });

    // Validate the response to ensure it includes the expected structure
    if (!response.data || typeof response.data.message !== 'string') {
      throw new Error(
        'Unexpected response from server: Missing "message" field'
      );
    }

    return response.data; // Backend should return a response with a message field
  } catch (error) {
    console.error('Error uploading CSV:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to upload the CSV file.'
    );
  }
};

/**
 * Custom React Hook to upload a CSV file.
 * @returns The mutation object from React Query.
 */
export const useUploadCSV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadCSV,
    onSuccess: (data) => {
      // Invalidate the `tableData` query to refresh data
      queryClient.invalidateQueries({ queryKey: ['tableData'] });

      if (data && data.message) {
        console.log('CSV uploaded successfully:', data.message);
      } else {
        console.warn(
          'CSV uploaded, but no message was provided in the response.'
        );
      }
    },
    onError: (error: unknown) => {
      // Log and handle errors during the upload
      console.error('Error in CSV upload mutation:', error);
    },
  });
};
