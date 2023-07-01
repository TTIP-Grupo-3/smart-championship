import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  card: {
    display: 'flex',
    backgroundColor: alpha(theme.palette.common.white, 0.05),
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  statusEnroll: {
    backgroundColor: theme.palette.blue[200],
  },
  leaderStatusEnroll: {
    color: theme.palette.common.white,
    fontSize: 15,
    fontFamily: 'sans-serif',
    fontWeight: 700,
    padding: 3,
    marginLeft: 7,
    width: 'fit-content',
    borderRadius: 5,
  },
}));
