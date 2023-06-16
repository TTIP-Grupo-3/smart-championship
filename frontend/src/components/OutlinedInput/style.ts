import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important',
  },
  input: {
    color: theme.palette.common.white,
  },
}));
