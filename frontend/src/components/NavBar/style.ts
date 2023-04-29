import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  root: { display: 'flex', flexGrow: 1, overflow: 'hidden' },
  appBar: {
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.common.black,
  },

  main: {
    flexGrow: 1,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#282c34',
    paddingInline: theme.spacing(2),
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
}));

export default useStyles;
