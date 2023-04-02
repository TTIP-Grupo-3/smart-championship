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
    backgroundColor: '#3F5865',
  },
}));

export default useStyles;
