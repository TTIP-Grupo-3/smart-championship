import { makeStyles } from 'tss-react/mui';
import { alpha, lighten, Theme } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  buttonText: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'sans-serif',
  },
  steps: {
    color: alpha(theme.palette.common.white, 0.68),
  },
  inputContainer: {
    padding: theme.spacing(2),
  },
  scroll: {
    height: '67vh',
  },

  buttonAdd: {
    borderRadius: 4,
    '&.Mui-disabled': {
      color: lighten(theme.palette.common.white, 0.05),
      backgroundColor: alpha(theme.palette.common.white, 0.38),
    },
  },
}));
