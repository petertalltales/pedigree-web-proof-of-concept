// button-upload-csv.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useUploadCSV } from '../../api/upload-csv';
import * as Styles from '../../styles/buttons';

interface ButtonUploadCSVProps {
  isVisible: boolean;
}

export function ButtonUploadCSV({ isVisible }: ButtonUploadCSVProps) {
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

  if (!isVisible) return null;

  return (
    <Button
      variant="contained"
      color="primary"
      component="label"
      sx={Styles.uploadCSVButton}
      aria-label="Upload CSV file"
    >
      Upload CSV
      <input type="file" accept=".csv" hidden onChange={handleFileChange} />
    </Button>
  );
}
