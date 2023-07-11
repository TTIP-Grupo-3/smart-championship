import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  menuitem: {
    paddingInline: '9px',
    minHeight: '32px',
    height: '32px',
    backgroundColor: lighten(theme.palette.background.paper, 0.12),
    '&:hover': { backgroundColor: lighten(theme.palette.background.paper, 0.24) },
  },
}));
