import { alpha, lighten, Theme } from '@mui/material/styles';
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
  input: {
    color: theme.palette.common.white,
  },
  gridContainerButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  textLogin: {
    fontWeight: 600,
    fontSize: 16,
    fontFamily: 'sans-serif',
    letterSpacing: '0.24px',
    lineHeight: '0.14px',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  buttonLogin: {
    width: '50%',
    backgroundColor: theme.palette.blue[200],
    '&:hover': {
      backgroundColor: theme.palette.blue[200],
    },
    '&.Mui-disabled': {
      color: lighten(theme.palette.common.white, 0.05),
      backgroundColor: alpha(theme.palette.common.white, 0.38),
    },
  },
  card: {
    backgroundColor: '#001E3C',
    padding: 48,
    borderRadius: 6,
  },
}));
