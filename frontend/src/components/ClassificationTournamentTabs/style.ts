import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#001E3C',
    color: theme.palette.common.white,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tabs: {
    display: 'flex',
  },
  indicator: {
    backgroundColor: '#ED7D31',
  },

  tab: {
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    color: theme.palette.common.white,
    '&.Mui-selected': {
      color: '#ED7D31',
    },
  },
}));
