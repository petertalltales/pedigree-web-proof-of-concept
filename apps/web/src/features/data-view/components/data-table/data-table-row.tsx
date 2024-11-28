// src/components/data-table/DataTableRow.tsx
import { TableCell, TableRow } from '@mui/material';
import { Individual } from '../../../../types/Individual';
import * as Style from '../../styles/data-table'; // Import styles

interface DataTableRowProps {
  row: Individual;
}

/**
 * Formats a date string or Date object into 'YYYY-MM-DD'.
 * @param date - ISO date string or Date object.
 * @returns Formatted date string.
 */
function parseDate(date: string | Date): string {
  return new Date(date).toISOString().split('T')[0];
}

/**
 * Maps gender string to a corresponding symbol.
 * @param gender - Gender string (e.g., 'male', 'female', etc.).
 * @returns A JSX element representing the gender symbol or the original value if unmatched.
 */
function renderGender(gender: string): JSX.Element | string {
  switch (gender.toLowerCase()) {
    case 'h':
      return 'Male'; // Male symbol
    case 't':
      return 'Female'; // Female symbol
    default:
      return gender; // Return the original value if no match
  }
}

/**
 * Component to render a single row of data in the table.
 * Formats dates using the parseDate helper.
 * Replaces gender with a symbol.
 * @param row - Data object representing a row.
 */
export function DataTableRow({ row }: DataTableRowProps) {
  return (
    <TableRow {...Style.tableRow}>
      {Object.entries(row).map(([key, value]) => (
        <TableCell {...Style.tableCell} key={key}>
          {key.includes('date')
            ? parseDate(value as string | Date)
            : key.toLowerCase().includes('gender')
            ? renderGender(value as string)
            : value ?? ''}
        </TableCell>
      ))}
    </TableRow>
  );
}
