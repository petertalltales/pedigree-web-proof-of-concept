//This could have been Button-action

import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useSetInbreedingForAll } from '../../api/set-inbreeding-for-all';

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

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        if (!isDisabled) {
          mutate();
        }
      }}
      disabled={isDisabled || isPending}
      startIcon={
        isPending ? <CircularProgress size={20} color="inherit" /> : null
      }
    >
      {isPending ? 'Calculating...' : 'Set Inbreeding for All'}
    </Button>
  );
}
