import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  gridContainer: {
    backgroundColor: lighten(theme.palette.background.paper, 0.08),
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
}));
