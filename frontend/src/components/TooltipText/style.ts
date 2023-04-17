import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  grid: { maxWidth: '100px' },
  typography: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 100,
    flexGrow: 1,
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: '16px',
    fontFamily: 'sans-serif',
    lineHeight: '24px',
    letterSpacing: '0.18px',
  },
  disabled: { color: alpha(theme.palette.common.white, 0.38) },
}));
