// It actually wasnt as bad as I thought it would be! But it needs refactoring, and better state management and helper hooks

import { Box, Paper, Table, TableContainer, Typography } from '@mui/material';
import { useFetchTableData } from '../../api/fetch-table-data';

import { DataTableHeader } from './data-table-header';
import { DataTableBody } from './data-table-body';
import { ButtonBar } from '../button-bar/button-bar';

export function DataTable() {
  const { data: tableData, isLoading, error } = useFetchTableData();

  if (error) {
    return (
      <Box sx={{ width: '100%', padding: 2 }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Pass tableData to ButtonBar */}
      <ButtonBar rows={tableData || []} />
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : tableData && tableData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <DataTableHeader columns={Object.keys(tableData[0])} />
            <DataTableBody rows={tableData} />
          </Table>
        </TableContainer>
      ) : (
        <Typography>No data available.</Typography>
      )}
    </Box>
  );
}
