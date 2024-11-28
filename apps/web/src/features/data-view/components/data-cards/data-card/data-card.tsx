// data-card.tsx
import { Grid2 as Grid } from '@mui/material';
import { Individual } from '../../../../../types/Individual';
import { DataCardTop } from './data-card-top';
import { DataCardMiddle } from './data-card-middle';
import { DataCardBottom } from './data-card-bottom';
import * as Style from '../../../styles/data-card'; // Import styles

interface DataCardGridProps {
  individual: Individual;
}

export function DataCard({ individual }: DataCardGridProps) {
  return (
    <Grid {...Style.cardContainer}>
      {/* Top Section */}
      <DataCardTop individual={individual} />

      {/* Middle Section */}
      <DataCardMiddle individual={individual} />

      {/* Bottom Section */}
      <DataCardBottom individual={individual} />
    </Grid>
  );
}
