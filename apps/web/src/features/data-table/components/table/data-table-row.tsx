// Torn how to design this, there are so many interesting ways a cell can look that a modular approach might be messier.

import { TableCell, TableRow } from '@mui/material';
import { Individual } from '../../types/Individual';

interface DataTableRowProp {
  row: Individual;
}

/**
 * Helper function to format ISO dates to 'YYYY-MM-DD'.
 * @param date - ISO date string or Date object.
 * @returns Formatted date string or the original value if not a valid date.
 */
function formatDate(date: string | Date | null | undefined): string {
  if (!date) return ''; // Return empty string if the value is null or undefined
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return ''; // Return empty string if invalid date
  return parsedDate.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
}

/**
 * Component to render a single row of data in the table.
 * @param row - Data object representing a row.
 */
export function DataTableRow({ row }: DataTableRowProp) {
  return (
    <TableRow>
      {Object.entries(row).map(([key, value]) => (
        <TableCell key={key}>
          {key === 'birth_date' || key === 'death_date'
            ? formatDate(value as string | Date)
            : value ?? ''}
        </TableCell>
      ))}
    </TableRow>
  );
}
