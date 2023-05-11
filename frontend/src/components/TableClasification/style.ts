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
    backgroundColor: 'white',
    color: 'black',
  },
  columnHead: {
    backgroundColor: '#bf360c',
    minWidth: '30%',
    color: 'white',
  },
  rows: {
    backgroundColor: 'black',
    color: 'white',
  },
}));
