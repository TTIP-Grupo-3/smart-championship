import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  grid: {
    borderRadius: theme.spacing(0.5),
    backgroundColor: lighten(theme.palette.background.paper, 0.08),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    boxShadow: theme.spacing(1),
    minHeight: '72vh',
    margin: theme.spacing(3),
  },
  reservationTitle: {
    paddingTop: theme.spacing(3),
    fontSize: 24,
    fontWeight: 700,
    fontFamily: 'sans-serif',
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  gridWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(6),
  },
  confirmUpload: {
    margin: '2%',
    backgroundColor: '#1990BB',
    color: 'white',
    width: '30%',
    '&:hover': {
      backgroundColor: '#1990BB',
    },
    '&.Mui-disabled': {
      backgroundColor: 'grey',
      color: theme.palette.common.white,
    },
  },
  buttonReservationGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
  },
  successReservation: {
    textAlign: 'center',
    color: theme.palette.common.white,
  },
  gridSuccess: {
    paddingTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    color: 'lightgreen',
    paddingRight: '3px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
