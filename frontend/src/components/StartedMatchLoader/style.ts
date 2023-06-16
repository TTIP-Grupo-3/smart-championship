import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export const useStyles = makeStyles()((theme: Theme) => ({
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
