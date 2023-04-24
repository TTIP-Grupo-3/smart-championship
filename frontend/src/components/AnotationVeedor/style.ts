import { blue, red } from '@mui/material/colors';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  gridContainer: {
    display: 'flex',
    flexGrow: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 0,
    margin: 0,
  },
  buttonAdd: {
    backgroundColor: red[500],
    color: 'white',
    width: '40%',
    fontFamily: '800',
    fontSize: 20,
  },
  buttonRemove: {
    fontFamily: '800',
    backgroundColor: blue[500],
    color: theme.palette.common.white,
    width: '40%',
    fontSize: 20,
  },
}));
