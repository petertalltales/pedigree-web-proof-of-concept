//Works fine but messier, styling has no place here.

import { TableCell, TableHead, TableRow } from '@mui/material';

/**
 * Props for the DataTableHeader component.
 */
interface DataTableHeaderProps {
  columns: string[];
}

/**
 * Utility function to transform a string to uppercase.
 * Replaces underscores with spaces and converts to uppercase.
 * @param str - Input string
 * @returns {string} The transformed uppercase string.
 */
const toUpperCase = (str: string) => str.replace(/_/g, ' ').toUpperCase();

/**
 * DataTableHeader component renders table headers with styled column names.
 * @param columns - Array of column names to display in the header.
 */
export function DataTableHeader({ columns }: DataTableHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column}
            sx={{
              backgroundColor: '#3f51b5',
              color: '#ffffff',
              fontWeight: 'bold',
              textAlign: 'left',
              padding: '16px',
              fontSize: '0.875rem',
              borderBottom: '2px solid #e0e0e0',
            }}
          >
            {toUpperCase(column)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
