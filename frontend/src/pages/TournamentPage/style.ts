import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  grid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  titleTournament: {
    fontWeight: 600,
    textAlign: 'center',
    color: theme.palette.common.white,
    fontSize: 24,
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
  enrollmentButton: {
    backgroundColor: '#00BCD4',
    margin: 8,
    '&:hover': {
      backgroundColor: '#00BCD4',
    },
    color: theme.palette.common.white,
  },
}));
