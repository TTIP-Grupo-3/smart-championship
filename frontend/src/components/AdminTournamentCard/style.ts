import { makeStyles } from 'tss-react/mui';
import { Theme, alpha, lighten } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  card: {
    backgroundColor: lighten(theme.palette.background.paper, 0.18),
    display: 'flex',
    flexGrow: 1,
    height: theme.spacing(9),
    minHeight: theme.spacing(9),
    maxHeight: theme.spacing(9),
    margin: theme.spacing(1, 1),
    borderRadius: theme.spacing(0.5),
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 3),
    alignItems: 'center',
  },
  typography: { color: alpha(theme.palette.common.white, 0.6) },
  deleteButton: {
    color: theme.palette.common.white,
    padding: theme.spacing(0),
    transform: 'translate(5px, 0px)',
  },
  button: { color: 'aqua' },
  rightSpacer: { display: 'flex', flexGrow: 1, width: theme.spacing(0) },
  rightButtons: {
    display: 'flex',
    flexGrow: 1,
    width: theme.spacing(0),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  endGrid: { display: 'flex', flexGrow: 1, justifyContent: 'flex-end', width: theme.spacing(0) },
  startGrid: { display: 'flex', flexGrow: 1, width: theme.spacing(0) },
  delete: { color: 'white' },
}));
