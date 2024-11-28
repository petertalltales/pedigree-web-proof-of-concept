import { Typography, Grid2 as Grid } from '@mui/material';
import { Individual } from '../../../../../types/Individual';
import * as Style from '../../../styles/data-card'; // Import styles

interface BottomCardProps {
  individual: Individual;
}

export function DataCardBottom({ individual }: BottomCardProps) {
  return (
    <Grid {...Style.bottomGrid}>
      {/* Left Section */}
      <Grid {...Style.bottomLeftGrid}>
        <Typography {...Style.inbreedingLabel}>Inbreeding:</Typography>
        <Typography {...Style.inbreedingResultLabel}>
          {individual.inbreeding
            ? `${(individual.inbreeding * 100).toFixed(2)}%`
            : 'Not calculated'}
        </Typography>
      </Grid>

      {/* Right Section */}
      <Grid {...Style.bottomRightGrid}>
        {individual.founder === 'Yes' && (
          <Typography {...Style.inbreedingFounderLabel}>FOUNDER</Typography>
        )}
      </Grid>
    </Grid>
  );
}
