import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  bracketTeamsConnection: {
    borderRight: '2px solid #82f7a0',
    borderTop: '2px solid #82f7a0',
    borderBottom: '2px solid #82f7a0',
    width: '100%',
    height: '49.5%',
  },
  bracketTeamConnect: {
    borderTop: '2px solid #82f7a0',
    width: '50%',
  },
}));
