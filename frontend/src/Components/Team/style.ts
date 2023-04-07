import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  backgroundTeamCard: {
    backgroundColor: 'black',
  },
  containerScore: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
    backgroundColor: 'green',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  goalsTypo: {
    paddingRight: '0.6em',
    paddingLeft: '0.6em',
    textAlign: 'center',
    color: 'white',
    fontWeight: 600,
  },
  nameTypo: {
    paddingLeft: 5,
    flexGrow: 5,
    color: 'white',
    fontWeight: 600,
    fontSize: '16px',
    fontFamily: 'sans-serif',
    lineHeight: '24px',
    letterSpacing: '0.18px',
  },
  diVertical: {
    border: '1px solid grey',
  },
  redCard: {
    fontSize: 16,
    fontWeight: 500,
    color: 'red',
  },
  yellowCard: {
    fontSize: 16,
    fontWeight: 500,
    color: 'yellow',
  },
}));
