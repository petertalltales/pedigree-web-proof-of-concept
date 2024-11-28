import {
  TableProps,
  TableBodyProps,
  TableHeadProps,
  TableRowProps,
  TableCellProps,
  TableContainerProps,
} from '@mui/material';

export const tableContainer: TableContainerProps = {
  sx: {
    width: '100%',
    height: '80vh',
    overflowX: 'auto',
    overflowY: 'auto',
    padding: '16px',
    boxSizing: 'border-box',
  },
};

export const table: TableProps = {
  sx: {
    minWidth: 650,
    maxWidth: '100%',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
};

export const tableHead: TableHeadProps = {
  sx: {
    backgroundColor: '#e0e0e0',
    '& .MuiTableCell-root': {
      fontWeight: 'bold',
      fontSize: '1rem',
      color: '#424242',
      textTransform: 'uppercase',
      position: 'sticky',
      top: 0,
      zIndex: 2,
      whiteSpace: 'nowrap',
    },
  },
};

export const tableBody: TableBodyProps = {
  sx: {
    '& .MuiTableRow-root:hover': {
      backgroundColor: '#f9f9f9',
    },
  },
};

export const tableRow: TableRowProps = {
  sx: {
    height: '56px',
    '&:nth-of-type(odd)': {
      backgroundColor: '#fafafa',
    },
  },
};

export const tableCell: TableCellProps = {
  sx: {
    padding: '16px',
    fontSize: '0.9rem',
    color: '#616161',
    textAlign: 'left',
  },
};

export const tableBodyNoData: TableBodyProps = {
  sx: {
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
};

export const tableRowNoData: TableRowProps = {
  sx: {
    height: '56px',
    fontSize: '1rem',
    color: '#757575',
  },
};

export const tableCellNoData: TableCellProps = {
  align: 'center',
  sx: {
    fontStyle: 'italic',
    color: '#9e9e9e',
  },
};
