import { makeStyles } from 'tss-react/mui';
import { alpha, Theme } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  text: {
    color: alpha(theme.palette.common.white, 0.65),
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'sans-serif',
  },
}));
