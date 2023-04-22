import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  backgroundDialog: {
    backgroundColor: lighten(theme.palette.background.paper, 0.09),
    padding: 24,
  },
  dialog: {
    minWidth: 600,
    minHeight: 400,
  },
  dialogTitle: {
    backgroundColor: lighten(theme.palette.background.paper, 0.09),
  },
  typographyTitle: {
    color: theme.palette.common.white,
    paddingLeft: '0.5em',
  },
  closeIcon: { position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500] },
  statsGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));
