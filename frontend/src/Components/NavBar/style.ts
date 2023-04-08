import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  root: { display: 'flex', flexGrow: 1, overflow: 'hidden' },
  appBar: {
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.common.black,
  },

  main: {
    flexGrow: 1,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: '#282c34',
    paddingInline: theme.spacing(2),
  },
  title: {
    fontFamily: 'sans-serif',
    fontWeight: 500,
    fontSize: 18,
    fontStyle: 'normal',
    letterSpacing: '1.50px',
    lineHeight: '24px',
    color: theme.palette.common.white,
  },
}));

export default useStyles;
