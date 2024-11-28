import { Typography, Grid2 as Grid } from '@mui/material';
import { Individual } from '../../../../../types/Individual';
import * as Style from '../../../styles/data-card'; // Import styles

interface MiddleCardProps {
  individual: Individual;
}

export function DataCardMiddle({ individual }: MiddleCardProps) {
  return (
    <Grid {...Style.middleGrid}>
      {/* Left Section: Name */}
      <Grid {...Style.middleLeftGrid}>
        <Typography {...Style.nameLabel}>{individual.name}</Typography>
      </Grid>

      {/* Right Section: Sire and Dame */}
      <Grid {...Style.middleRightGrid}>
        {/* Sire Row */}
        <Grid {...Style.parentGrid}>
          <Grid {...Style.parentLabelGrid}>
            <Typography {...Style.parentLabel}>SIRE:</Typography>
          </Grid>
          <Grid {...Style.parentIdGrid}>
            <Typography {...Style.parentIdLabel}>
              {individual.father_id || 'Unknown'}
            </Typography>
          </Grid>
        </Grid>

        {/* Sire Row */}
        <Grid {...Style.parentGrid}>
          <Grid {...Style.parentLabelGrid}>
            <Typography {...Style.parentLabel}>DAME:</Typography>
          </Grid>
          <Grid {...Style.parentIdGrid}>
            <Typography {...Style.parentIdLabel}>
              {individual.mother_id || 'Unknown'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
