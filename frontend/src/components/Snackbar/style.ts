import { makeStyles } from 'tss-react/mui';
import { lighten, Theme } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  content: {
    minWidth: 'unset',
    minHeight: 'unset',
    width: 'auto',
    height: '48px',
    backgroundColor: lighten(theme.palette.background.paper, 0.18),
    padding: '0px 16px',
  },
  colorInitial: {
    color: 'grey',
    paddingLeft: 10,
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
  },
  distance: {
    color: theme.palette.common.white,
    paddingLeft: 10,
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
  },
  withColor: {
    color: theme.palette.common.white,
    paddingLeft: 5,
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
  },
  icon: {
    fontSize: '20px',
    viewBox: '0 0 25 25 !important',
  },
  success: {
    color: '#197B00',
    backgroundColor: theme.palette.common.white,
    borderRadius: '100%',
  },
  error: {
    color: '#B00020',
  },
  loading: {
    color: 'orange',
  },
  colorButton: {
    color: theme.palette.common.white,
    backgroundColor: 'blue',
  },
}));
