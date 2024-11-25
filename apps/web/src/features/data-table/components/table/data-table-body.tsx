// It starts off good, clear types and props, but then I was running out of time til my meeting.

import { TableBody } from '@mui/material';
import { Individual } from '../../types/Individual';
import { DataTableRow } from './data-table-row';

interface DataTableBodyProps {
  rows: Individual[];
}

export function DataTableBody({ rows }: DataTableBodyProps) {
  return (
    <TableBody>
      {rows.map((row) => (
        <DataTableRow key={row.id} row={row} />
      ))}
    </TableBody>
  );
}
