import { green } from '@mui/material/colors';
import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  backgroundDialog: {
    backgroundColor: lighten(theme.palette.background.paper, 0.09),
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
  teamMatch: {
    borderRadius: '4px',
    flexGrow: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultScore: {
    color: theme.palette.common.white,
  },
  time: {
    color: theme.palette.common.white,
  },
  timer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGlow: 1,
  },
  statsGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
  },
  teamStats: {
    borderRadius: '0px',
    backgroundColor: 'white',
    flexGrow: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: '#45273F',

    borderRadius: 4,
  },
  loader: {
    display: 'flex',
    width: 30,
    borderRadius: 4,
    backgroundColor: 'transparent',
    '.MuiLinearProgress-bar': {
      backgroundColor: green['A400'],
      borderRadius: 4,
    },
  },
}));
