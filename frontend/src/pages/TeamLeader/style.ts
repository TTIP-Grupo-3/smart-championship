import { alpha, lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  gridRoot: {
    backgroundColor: 'rgb(57, 60, 68)',
    margin: 40,
    minHeight: '76vh',
    borderRadius: 4,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 24,
    paddingTop: 10,
    fontFamily: 'sans-serif',
    color: theme.palette.common.white,
  },
  item: {
    display: 'flex',
    borderRadius: 4,
  },
  team: {
    backgroundColor: 'rgb(78, 81, 88)',
    height: '55vh',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  buttonEnroll: {
    backgroundColor: theme.palette.blue[200],
    marginRight: '2%',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.blue[200],
    },
    '&.Mui-disabled': {
      color: lighten(theme.palette.common.white, 0.05),
      backgroundColor: alpha(theme.palette.common.white, 0.38),
    },
  },
  buttonText: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'sans-serif',
  },
  teamText: {
    fontWeight: 600,
    fontSize: 18,
    fontFamily: 'sans-serif',
    paddingLeft: 10,
    paddingTop: theme.spacing(2),
    color: theme.palette.common.white,
  },
  teamPlayerText: {
    fontWeight: 600,
    fontSize: 18,
    fontFamily: 'sans-serif',
    paddingLeft: theme.spacing(2),
    color: theme.palette.common.white,
  },
  gridLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '6%',
  },
  gridLogo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
  },
  gridRigthContent: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1.2),
    flexDirection: 'row',
  },
  gridSpacer: {
    paddingTop: 30,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createTeam: {
    backgroundColor: theme.palette.blue[200],
    marginRight: '2%',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.blue[200],
    },
  },
  emptyTeamGrid: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    placeItems: 'center',
  },

  leaderTeamName: {
    fontWeight: 600,
    fontSize: 18,
    fontFamily: 'sans-serif',
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1.2),
    color: theme.palette.common.white,
  },
  addIconButton: {
    backgroundColor: theme.palette.blue[200],
    marginLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.blue[200],
    },
  },
  pendingInfo: {
    color: lighten(theme.palette.orange[200], 0.2),
    fontWeight: 600,
    fontSize: 15,
    fontFamily: 'sans-serif',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
  },
}));
