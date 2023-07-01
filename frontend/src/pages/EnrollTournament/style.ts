import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.common.white,
  },

  textEnroll: {
    fontSize: 23,
    fontFamily: 'sans-serif',
    fontWeight: 700,
    color: theme.palette.common.white,
    textAlign: 'center',
  },

  gridLoading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  enrollmentButton: {
    backgroundColor: theme.palette.blue[200],
    margin: 8,
    '&:hover': {
      backgroundColor: theme.palette.blue[200],
    },
    color: theme.palette.common.white,
  },
}));
