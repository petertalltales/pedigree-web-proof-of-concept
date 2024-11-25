// Not implemented yet, some generic warnings and popups are great to have around when designing
import { Box, Typography } from '@mui/material';

interface ErrorProps {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography color="error">Error: {message}</Typography>
    </Box>
  );
}
