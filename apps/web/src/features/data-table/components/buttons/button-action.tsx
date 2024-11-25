//Pretty decent modular button! Had to do some edgecases due to lacking time, but this one is pretty good.

import { Button } from '@mui/material';

interface ButtonActionProps {
  label: string;
  action: () => Promise<void> | void;
  isDisabled: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error';
}

export function ButtonAction({
  label,
  action,
  isDisabled,
  color = 'primary', // Default to blue
}: ButtonActionProps) {
  const handleClick = async () => {
    if (isDisabled) return;

    try {
      await action();
    } catch (error) {
      console.error(`Action "${label}" failed:`, error);
    }
  };

  return (
    <Button
      variant="contained"
      color={color}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {label}
    </Button>
  );
}
