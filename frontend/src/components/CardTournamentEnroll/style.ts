import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  card: {
    display: 'flex',
    backgroundColor: theme.palette.common.black,
    width: '100%',
    transition: '0.3s all ease-in-out',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  container: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
}));
