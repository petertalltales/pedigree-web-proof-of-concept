import { Typography, Grid2 as Grid, Box } from '@mui/material';
import * as Style from '../../../styles/data-card'; // Import styles
import { Individual } from '../../../../../types/Individual';

interface TopCardProps {
  individual: Individual;
}

export function DataCardTop({ individual }: TopCardProps) {
  // Determine gender symbol and corresponding box style
  const genderSymbol = individual.gender === 'H' ? '♂' : '♀';
  const genderBoxStyle =
    individual.gender === 'H' ? Style.genderMaleBox : Style.genderFemaleBox;
  const formattedBirthDate = individual.birth_date
    ? new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(individual.birth_date))
    : 'Unknown';

  return (
    <Grid {...Style.topGrid}>
      {/* Left Section: Gender Symbol and ID in rounded boxes */}
      <Grid {...Style.topLeftGrid}>
        {/* Gender Symbol */}
        <Box {...genderBoxStyle}>{genderSymbol}</Box>

        {/* ID in Rounded Box */}
        <Box {...Style.idBox}>{individual.id}</Box>
      </Grid>

      {/* Right Section: Breed and Birth Date */}
      <Grid {...Style.topRightGrid}>
        {/* Breed */}
        <Typography {...Style.breedLabel}>{individual.breed}</Typography>

        {/* Birth Date */}
        <Typography {...Style.birthDateLabel}>{formattedBirthDate}</Typography>
      </Grid>
    </Grid>
  );
}
