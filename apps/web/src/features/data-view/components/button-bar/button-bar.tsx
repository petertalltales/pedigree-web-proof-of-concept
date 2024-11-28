// button-bar.tsx
import React from 'react';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { ButtonClearData } from '../buttons/button-clear-data';
import { ButtonUploadCSV } from '../buttons/button-upload-csv';
import { ButtonInbreeding } from '../buttons/button-inbreeding';
import { Individual } from '../../../../types/Individual';

interface ButtonBarProps {
  tableData: Individual[];
}

export function ButtonBar({ tableData }: ButtonBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust breakpoint as needed

  const hasData = tableData.length > 0;
  const isSetInbreedingDisabled =
    !hasData || tableData.every((row) => row.inbreeding);

  return (
    <Box marginBottom={2}>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        alignItems={isMobile ? 'stretch' : 'center'}
      >
        {/* Upload CSV Button */}
        <ButtonUploadCSV isVisible={!hasData} />

        {/* Clear Data Button */}
        <ButtonClearData isVisible={hasData} />

        {/* Set Inbreeding Button */}
        <ButtonInbreeding isDisabled={isSetInbreedingDisabled} />
      </Stack>
    </Box>
  );
}
