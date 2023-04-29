import { blue, red } from '@mui/material/colors';
import { lighten, Theme } from '@mui/material/styles';
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
    backgroundColor: blue[900],
    color: theme.palette.common.white,
    borderRadius: 90,
    width: '25%',
    fontFamily: '800',
    fontSize: 20,
    '&:hover': {
      backgroundColor: blue[900],
    },
  },
  buttonRemove: {
    fontFamily: '800',
    color: theme.palette.common.white,
    borderRadius: 90,
    width: '25%',
    backgroundColor: lighten('#121212', 0.05),
    fontSize: 20,
    '&:hover': {
      backgroundColor: lighten('#121212', 0.05),
    },
  },
}));
