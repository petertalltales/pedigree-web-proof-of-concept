import { Stack, Typography, Box } from '@mui/material';
import { Individual } from '../../../../types/Individual';
import { DataCard } from './data-card/data-card';
import * as Style from '../../styles/data-card'; // Import styles
interface DataCardStackProps {
  tableData: Individual[];
}

export function DataCardStack({ tableData }: DataCardStackProps) {
  if (tableData.length === 0) {
    return (
      <Box {...Style.noDataBox}>
        <Typography {...Style.noDataLabel}>No data available</Typography>
      </Box>
    );
  }

  return (
    <Stack {...Style.cardStack}>
      {tableData.map((individual) => (
        <DataCard key={individual.id} individual={individual} />
      ))}
    </Stack>
  );
}
