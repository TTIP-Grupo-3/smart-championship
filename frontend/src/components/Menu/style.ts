import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  paper: {
    overflow: 'hidden',
    backgroundColor: lighten(theme.palette.background.paper, 0.12),
    borderRadius: '4px',
    paddingBlock: '8px',
  },
  list: { padding: '0px' },
}));
