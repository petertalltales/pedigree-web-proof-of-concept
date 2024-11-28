// button-clear-data.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useClearTableData } from '../../api/clear-table-data';
import * as Styles from '../../styles/buttons';

interface ButtonClearDataProps {
  isVisible: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error';
}

export function ButtonClearData({
  isVisible,
  color = 'primary',
}: ButtonClearDataProps) {
  const { mutate: clearData } = useClearTableData();

  const handleClick = () => {
    try {
      clearData();
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  };

  if (!isVisible) return null; // Conditional rendering

  return (
    <Button
      variant="contained"
      color={color}
      onClick={handleClick}
      sx={Styles.clearDataButton} // Apply centralized styles
    >
      Clear Data
    </Button>
  );
}
