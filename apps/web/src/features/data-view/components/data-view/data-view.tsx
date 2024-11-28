// src/components/data-view/DataView.tsx
import { Box, useMediaQuery, useTheme, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchTableData } from '../../api/fetch-table-data';
import { ButtonBar } from '../button-bar/button-bar';
import { DataTable } from '../data-table/data-table';
import { DataCardStack } from '../data-cards/data-card-stack';

export function DataView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust breakpoint as needed

  const { data, isLoading, error } = useQuery({
    queryKey: ['tableData'],
    queryFn: fetchTableData,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return (
      <Box className="errorBox">
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box className="container">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const tableData = data || [];

  return (
    <Box className="container">
      <ButtonBar tableData={tableData} />
      {isMobile ? (
        <DataCardStack tableData={tableData} />
      ) : (
        <DataTable tableData={tableData} />
      )}
    </Box>
  );
}
