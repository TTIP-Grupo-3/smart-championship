import { makeStyles } from 'tss-react/mui';
import { alpha, Theme } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  selectStyle: {
    border: '1px solid white',
    width: '100%',
    '& .MuiSelect-icon': {
      color: theme.palette.common.white,
    },
    '& .MuiSelect-outlined': {
      backgroundColor: alpha(theme.palette.common.black, 0.12),
      color: theme.palette.common.white,
    },
  },
  menuItemStyle: {
    color: theme.palette.common.white,
    ':focus': {
      color: theme.palette.common.white,
    },
    '& .MuiMenuItem-root': {
      ':hover': {
        backgroundColor: '#1990BB',
        color: theme.palette.common.black,
      },
    },
  },
}));
