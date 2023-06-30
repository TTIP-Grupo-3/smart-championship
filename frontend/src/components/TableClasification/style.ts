import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  paper: {
    width: '100%',
    overflow: 'hidden',
  },
  tableContainer: {
    maxHeight: 380,
  },
  table: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
  },
  columnHead: {
    backgroundColor: theme.palette.orange[300],
    minWidth: '30%',
    color: theme.palette.common.white,
  },
  rows: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
  },
}));
