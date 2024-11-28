// src/components/data-table/DataTableHeader.tsx
import { TableCell, TableHead, TableRow } from '@mui/material';
import { Individual } from '../../../../types/Individual';
import * as Style from '../../styles/data-table'; // Import styles

interface DataTableHeaderProps {
  tableData: Individual[];
}

const toUpperCase = (str: string) => str.replace(/_/g, ' ').toUpperCase();

export function DataTableHeader({ tableData }: DataTableHeaderProps) {
  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  return (
    <TableHead {...Style.tableHead}>
      <TableRow {...Style.tableRow}>
        {columns.map((column) => (
          <TableCell {...Style.tableCell} key={column} className="headerCell">
            {toUpperCase(column)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
