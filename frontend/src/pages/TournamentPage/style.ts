import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),

    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'sans-serif',
  },
}));
