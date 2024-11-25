//This too.

import { Button, Box } from '@mui/material';
import { useUploadCSV } from '../../api/upload-csv';

/**
 * Component for uploading a CSV file.
 */
export function ButtonUploadCSV() {
  const uploadCSV = useUploadCSV();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadCSV.mutate(file, {
        onSuccess: (data) => {
          alert(data.message || 'File uploaded successfully.');
        },
        onError: (error) => {
          alert('Error uploading the file. Check the console for details.');
          console.error('Upload error:', error);
        },
      });
    }
  };

  return (
    <Box>
      <Button variant="contained" color="success" component="label">
        Upload CSV
        <input type="file" accept=".csv" hidden onChange={handleFileChange} />
      </Button>
    </Box>
  );
}
