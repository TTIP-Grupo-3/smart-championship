import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  teamStats: {
    backgroundColor: lighten(theme.palette.background.paper, 0.2),
    borderRadius: 'inherit',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
}));
