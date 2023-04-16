import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  bracketTeamsConnection: {
    borderRight: '2px solid white',
    borderTop: '2px solid white',
    borderBottom: '2px solid white',
    width: '100%',
    height: '49.5%',
  },
  bracketTeamConnect: {
    borderTop: '2px solid white',
    width: '50%',
  },
}));
