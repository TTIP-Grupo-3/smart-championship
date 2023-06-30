import { makeStyles } from 'tss-react/mui';
import { alpha, lighten, Theme } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  buttonText: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'sans-serif',
  },
  steps: {
    color: alpha(theme.palette.common.white, 0.68),
  },
  inputContainer: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  scroll: {
    height: '67vh',
  },

  buttonAdd: {
    borderRadius: 4,
    '&.Mui-disabled': {
      color: lighten(theme.palette.common.white, 0.05),
      backgroundColor: alpha(theme.palette.common.white, 0.38),
    },
  },
  dialog: {
    borderRadius: 4,
    width: '100%',
  },
  titleDialog: {
    color: theme.palette.common.white,
    paddingLeft: theme.spacing(3),
  },
  dialogContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContentColumn: {
    flexDirection: 'column',
    display: 'flex',
  },
  gridContentRow: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: '2%',
    alignItems: 'center',
  },
  gridImage: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  imageTeam: {
    borderRadius: '100%',
    width: '60px',
    height: '60px',
    marginRight: 10,
  },
  buttonUpload: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  createTeamButton: {
    backgroundColor: theme.palette.blue[200],
    borderRadius: 4,
    '&:hover': {
      backgroundColor: theme.palette.blue[200],
    },
  },
}));
