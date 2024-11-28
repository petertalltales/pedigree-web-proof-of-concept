// src/components/data-table/DataTable.tsx
import { Table, TableContainer } from '@mui/material';
import { Individual } from '../../../../types/Individual';
import { DataTableHeader } from './data-table-header';
import { DataTableBody } from './data-table-body';
import * as Style from '../../styles/data-table'; // Import styles

interface DataTableProps {
  tableData: Individual[];
}

export function DataTable({ tableData }: DataTableProps) {
  return (
    <TableContainer {...Style.tableContainer}>
      <Table {...Style.table}>
        <DataTableHeader tableData={tableData} />
        <DataTableBody tableData={tableData} />
      </Table>
    </TableContainer>
  );
}
