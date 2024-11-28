// This is how I like my React Components to look like, clean and dealing with one thing.

import { Box } from '@mui/material';
import { DataView } from '../../features/data-view/components/data-view/data-view';

export function DataRoute() {
  return (
    <Box>
      <DataView />
    </Box>
  );
}
