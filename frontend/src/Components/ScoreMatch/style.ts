import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  result: {
    color: theme.palette.common.white,
    fontSize: '40px',
    fontFamily: 'sans-serif',
    fontWeight: 600,
    lineHeight: '60px',
    letterSpacing: '0.24px',
  },
  resultGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
}));
