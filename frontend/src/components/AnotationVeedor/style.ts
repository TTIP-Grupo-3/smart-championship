import { blue } from '@mui/material/colors';
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
    borderRadius: 10,
    width: '35%',
    height: 50,
    fontFamily: '800',
    fontSize: 20,
    '&:hover': {
      backgroundColor: blue[900],
    },
  },
  buttonRemove: {
    fontFamily: '800',
    height: 50,
    color: theme.palette.common.white,
    borderRadius: 10,
    width: '35%',
    backgroundColor: lighten('#121212', 0.05),
    fontSize: 20,
    '&:hover': {
      backgroundColor: lighten('#121212', 0.05),
    },
    '&.Mui-disabled': {
      backgroundColor: 'grey',
    },
  },
}));
