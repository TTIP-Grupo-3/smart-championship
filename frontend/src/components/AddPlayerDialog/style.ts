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
    display: 'flex',
    textAlign: 'center',
    color: alpha(theme.palette.common.white, 0.68),
  },
  inputContainer: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  scroll: {
    height: '67vh',
  },

  buttonAdd: {
    backgroundColor: theme.palette.blue[200],
    borderRadius: 4,
    '&:hover': {
      backgroundColor: theme.palette.blue[200],
    },
    '&.Mui-disabled': {
      color: lighten(theme.palette.common.white, 0.05),
      backgroundColor: alpha(theme.palette.common.white, 0.38),
    },
  },
  gridButton: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: theme.spacing(2),
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  gridDialogContainer: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContent: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
