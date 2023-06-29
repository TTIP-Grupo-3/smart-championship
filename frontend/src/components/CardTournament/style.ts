import { makeStyles } from 'tss-react/mui';
import { Theme, lighten } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  card: {
    maxWidth: 345,
    backgroundColor: lighten(theme.palette.common.black, 0.1),
    display: 'flex',
    width: '100%',
    transition: '0.3s all ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  },
}));
