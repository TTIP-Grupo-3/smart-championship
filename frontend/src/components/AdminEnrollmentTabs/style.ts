import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: lighten(theme.palette.common.black, 0.1),
    color: theme.palette.common.white,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tabs: {
    display: 'flex',
  },
  indicator: {
    backgroundColor: '#1990BB',
  },

  tab: {
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    color: theme.palette.common.white,
    '&.Mui-selected': {
      color: '#1990BB',
    },
  },
}));
