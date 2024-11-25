// This is how I like my React Components to look like, clean and dealing with one thing.

import { Box } from '@mui/material';
import { DataTable } from '../../features/data-table/components/table/data-table';

export function DataRoute() {
  return (
    <Box>
      <DataTable />
    </Box>
  );
}
