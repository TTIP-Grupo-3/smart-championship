import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  bracketTeamsConnection: {
    borderRight: '2px solid black',
    borderTop: '2px solid black',
    borderBottom: '2px solid black',
    width: '100%',
    height: '50%',
  },
  bracketTeamConnect: {
    borderTop: '2px solid black',
    width: '50%',
  },
}));
