import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  matchesRound: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    position: 'relative',
  },
  round: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  gridLeft: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  alineationMatch: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 0,
    margin: 0,
  },
  alineationTeamsColumn: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
}));
