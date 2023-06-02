import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  root: { display: 'flex', flexGrow: 1 },
  appBar: {
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.common.black,
  },

  main: {
    flexGrow: 1,
  },
  titleSmart: {
    fontFamily: 'sans-serif',
    fontWeight: 500,
    fontSize: 30,
    fontStyle: 'normal',
    letterSpacing: '1.50px',
    lineHeight: '24px',
    color: theme.palette.common.white,
  },
  titleDot: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 50,
    fontStyle: 'normal',
    letterSpacing: '1.50px',
    lineHeight: '0px',
    marginInline: theme.spacing(1),
    color: '#A466A8',
  },

  titleChampionship: {
    fontFamily: 'sans-serif',
    fontWeight: 700,
    fontSize: 30,
    fontStyle: 'normal',
    letterSpacing: '1.50px',
    lineHeight: '24px',
    color: theme.palette.common.white,
  },
  content: { flexGrow: 1 },
  username: {
    color: theme.palette.grey[50],
    fontFamily: 'sans-serif',
    flexWrap: 'nowrap',
    [theme.breakpoints.down(554)]: {
      display: 'none',
    },
  },
  gridUser: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
