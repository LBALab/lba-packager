import {
  Typography,
  TableRow as TableRowMUI,
  TableCell as TableCellMUI,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

export const TableCell = styled(TableCellMUI)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
  },
}));

export const BlankTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.error.dark,
}));

export const TableRow = styled(TableRowMUI)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const EntryTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': { border: 0 },
}));

export const TypeCaption = styled(Typography)(() => ({
  background: 'rgba(0, 0, 0, 0.15)',
  borderRadius: 3,
  padding: '1px 4px',
  color: 'grey',
  cursor: 'default',
}));
