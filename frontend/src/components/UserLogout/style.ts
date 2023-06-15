import { alpha, lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<{ menuWidth: number }>()((theme: Theme, { menuWidth }) => ({
  menuitem: {
    width: `${menuWidth}px !important`,
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
  },
  icon: { marginInline: '-2px 4px', color: alpha(theme.palette.common.white, 0.87), fontSize: '18px' },
  button: {
    borderRadius: '4px',
    padding: '6px',
    color: alpha(theme.palette.common.white, 0.6),
    '&:hover': { backgroundColor: lighten(theme.palette.background.paper, 0.065) },
  },
  arrow: { fontSize: '16px' },
  text: { color: alpha(theme.palette.common.white, 0.87) },
  avatar: {
    marginLeft: 5,
    width: 26,
    height: 26,
    fontSize: '1rem',
    fontFamily: '800',
    fontStyle: 'sans-serif',
  },
}));
