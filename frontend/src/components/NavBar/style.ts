import { makeStyles } from 'tss-react/mui';
import { alpha, Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  root: { display: 'flex', flexGrow: 1 },
  appBar: {
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.common.black,
  },

  main: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    minHeight: '100vh',
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
  footer: {
    backgroundColor: alpha(theme.palette.common.black, 0.6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingRight: '2%',
    boxShadow: theme.shadows[12],
  },
  contact: {
    paddingTop: 5,
    paddingRight: 163,
    fontFamily: 'sans-serif',
    fontWeight: 800,
    fontSize: 16,
    color: alpha(theme.palette.common.white, 0.67),
    textAlign: 'center',
    paddingBottom: '3px',
  },
  email: {
    paddingLeft: 4,
    fontStyle: 'italic',
    color: theme.palette.common.white,
    fontSize: 14,
  },
  containerEmail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
}));

export default useStyles;
