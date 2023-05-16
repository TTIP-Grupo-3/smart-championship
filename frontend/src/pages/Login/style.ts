import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import image from '../../prueba.jpg';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    minHeight: '89vh',
    position: 'absolute',
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important',
  },
  label: {
    color: theme.palette.common.white,
  },
  input: {
    color: theme.palette.common.white,
  },
}));
