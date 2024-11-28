// button-inbreeding.tsx
import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useSetInbreedingForAll } from '../../api/set-inbreeding-for-all';
import * as Styles from '../../styles/buttons';

interface ButtonInbreedingProps {
  isDisabled: boolean;
}

export function ButtonInbreeding({ isDisabled }: ButtonInbreedingProps) {
  const { mutate, isPending, isError, error } = useSetInbreedingForAll();

  React.useEffect(() => {
    if (isError) {
      console.error('Failed to set inbreeding:', error);
    }
  }, [isError, error]);

  const handleClick = () => {
    if (isDisabled) return;
    mutate();
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleClick}
      disabled={isDisabled || isPending}
      sx={Styles.inbreedingButton}
      startIcon={
        isPending ? <CircularProgress size={20} color="inherit" /> : null
      }
    >
      {isPending ? 'Calculating...' : 'Calculate Inbreeding'}
    </Button>
  );
}
