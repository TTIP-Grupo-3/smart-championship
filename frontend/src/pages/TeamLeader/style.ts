import { Theme } from '@mui/material/styles';
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
    backgroundColor: '#00BCD4',
    marginRight: '2%',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#00BCD4',
    },
  },
  buttonText: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'sans-serif',
  },
}));
