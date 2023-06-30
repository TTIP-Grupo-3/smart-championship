import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  buttonText: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'sans-serif',
  },
  buttonClose: {
    backgroundColor: theme.palette.blue[200],
    borderRadius: 4,
  },
}));
