import { makeStyles } from 'tss-react/mui';
import { Theme, lighten, alpha } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(1.5),
  },
  title: {
    color: lighten(theme.palette.common.white, 0.87),
    fontWeight: 400,
    display: 'inline',
  },
  grid: {
    paddingInline: theme.spacing(6),
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: theme.spacing(4.5),
  },
  card: {
    paddingInline: theme.spacing(2),
    paddingBlock: theme.spacing(4),
    borderRadius: theme.spacing(0.5),
    backgroundColor: lighten(theme.palette.background.paper, 0.08),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    boxShadow: theme.spacing(1),
    height: '68vh',
  },
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
      ':focus': { WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset` },
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
    },
    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
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
  endHeaderSpacer: { display: 'flex', marginRight: theme.spacing(3) },
  endHeader: { display: 'flex', alignItems: 'center' },
  button: { fontWeight: 600, color: '#1990BB' },
  scroll: { height: '0px', marginRight: '4px' },
  createButton: { border: '1.5px solid #1990BB', padding: '4px 8px' },
}));
