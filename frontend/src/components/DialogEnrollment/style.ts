import { alpha, lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  dialogPaper: {
    height: '90%',
    width: 'auto',
    maxWidth: '80%',
  },
  title: {
    color: theme.palette.common.white,
    borderBottom: '1px solid grey',
  },
  recipt: {
    width: '75vw',
    height: 'auto',
  },
  content: {
    paddingTop: '20px !important',
    overflow: 'visible',
  },
  buttonConfirm: {
    color: theme.palette.common.white,
    fontWeight: 600,
    backgroundColor: 'green',
    '&:hover': {
      backgroundColor: 'green',
    },
    '&.Mui-disabled': {
      color: lighten(theme.palette.common.white, 0.05),
      backgroundColor: alpha(theme.palette.common.white, 0.38),
    },
  },
  buttonDecline: {
    color: theme.palette.common.white,
    fontWeight: 600,
    backgroundColor: 'red',
    '&:hover': {
      backgroundColor: 'red',
    },
    '&.Mui-disabled': {
      color: lighten(theme.palette.common.white, 0.05),
      backgroundColor: alpha(theme.palette.common.white, 0.38),
    },
  },
  scroll: { height: '80vh' },
}));