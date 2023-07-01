import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  gridElimination: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    margin: theme.spacing(2),
    backgroundColor: lighten(theme.palette.background.paper, 0.05),
    borderRadius: 4,
    boxShadow: theme.shadows[4],
  },
}));
