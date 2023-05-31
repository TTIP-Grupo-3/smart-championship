import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important',
  },

  root: {
    marginTop: 16,
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
  input: {
    color: theme.palette.common.white,
  },
  scroll: { height: '60vh', marginRight: '4px', paddingInline: 20 },
}));
