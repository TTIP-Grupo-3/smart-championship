import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  gridContainer: {
    display: 'flex',
    height: '180px',
    width: '100%',
    padding: 0,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridTeam: {
    flexDirection: 'column',
    flexGrow: 1,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '239px',
    cursor: 'pointer',
    width: '100%',
    zIndex: 5,
    transition: '0.3s all ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  },
}));
