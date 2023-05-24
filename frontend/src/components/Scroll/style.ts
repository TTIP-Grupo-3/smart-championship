import { makeStyles } from 'tss-react/mui';
import { Theme, alpha } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    overflow: 'auto',
    overflowX: 'auto',
    marginRight: theme.spacing(1),
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',

    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: theme.spacing(1.25),
      backgroundColor: alpha(theme.palette.common.white, 0.12),
    },

    '&::-webkit-scrollbar': {
      borderRadius: theme.spacing(1.25),
      width: theme.spacing(0.75),
      height: theme.spacing(0.75),
      backgroundColor: alpha(theme.palette.common.white, 0.12),
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: theme.spacing(1.25),
      webkitBoxShadow: 'inset 0 0 2px rgba(0,0,0,.3)',
      backgroundColor: alpha(theme.palette.common.white, 0.38),
    },
  },
}));
