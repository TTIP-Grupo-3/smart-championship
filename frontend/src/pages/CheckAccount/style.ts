import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  grid: {
    borderRadius: theme.spacing(0.5),
    backgroundColor: lighten(theme.palette.background.paper, 0.08),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    boxShadow: theme.spacing(1),
    minHeight: '72vh',
    margin: theme.spacing(6),
  },
  title: {
    paddingTop: theme.spacing(3),
    fontSize: 24,
    fontWeight: 700,
    fontFamily: 'sans-serif',
    color: theme.palette.common.white,
    textAlign: 'center',
  },

  buttons: {
    backgroundColor: '#1990BB',
    color: 'white',
    margin: '2%',
    width: '30%',
    '&:hover': {
      backgroundColor: '#1990BB',
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridText: {
    paddingLeft:theme.spacing(2),
    paddingRight:theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(6),
  },
}));
