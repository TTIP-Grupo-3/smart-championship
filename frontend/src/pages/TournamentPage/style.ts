import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),

    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'sans-serif',
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
}));
