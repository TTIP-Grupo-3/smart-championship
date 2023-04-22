import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  teamStats: {
    borderRadius:'inherit',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
}));
