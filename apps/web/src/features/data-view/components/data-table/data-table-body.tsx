// src/components/data-table/DataTableBody.tsx
import { TableBody, TableRow, TableCell } from '@mui/material';
import { Individual } from '../../../../types/Individual';
import { DataTableRow } from './data-table-row';
import * as Style from '../../styles/data-table'; // Import styles

interface DataTableBodyProps {
  tableData: Individual[];
}

export function DataTableBody({ tableData }: DataTableBodyProps) {
  if (tableData.length === 0) {
    return (
      <TableBody {...Style.tableBodyNoData}>
        <TableRow {...Style.tableRowNoData}>
          <TableCell {...Style.tableCellNoData}>No data available.</TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody {...Style.tableBody}>
      {tableData.map((row) => (
        <DataTableRow key={row.id} row={row} />
      ))}
    </TableBody>
  );
}
