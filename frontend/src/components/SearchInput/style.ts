import { makeStyles } from 'tss-react/mui';
import { Theme, alpha } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  focused: {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.grey[50] },
    '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[50],
    },
  },
  input: {
    color: alpha(theme.palette.common.white, 0.38),
    width: theme.spacing(25),
    height: theme.spacing(4.5),
    '&:-webkit-autofill': {
      ':focus': { WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset` },
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
    },
    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
    WebkitTextFillColor: theme.palette.common.white,
    ':hover .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.white, 0.6),
    },
  },
  notchedOutline: { borderColor: alpha(theme.palette.common.white, 0.38) },
  searchIcon: {
    color: theme.palette.common.white,
    width: theme.spacing(2.25),
    height: theme.spacing(2.25),
  },
}));
