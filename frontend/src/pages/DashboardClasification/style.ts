import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  gridContainer: {
    backgroundColor: lighten(theme.palette.background.paper, 0.08),
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    marginTop: theme.spacing(2),
  },
  tournamentTitle: {
    color: theme.palette.common.white,
    fontSize: 20,
    fontWeight: 600,
    paddingTop: '2%',
    paddingLeft: theme.spacing(6),
  },
}));
