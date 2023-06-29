import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  buttonText: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'sans-serif',
  },

  createTeam: {
    backgroundColor: '#00BCD4',
    marginRight: '2%',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#00BCD4',
    },
  },
  emptyTeamGrid: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    placeItems: 'center',
  },
}));
