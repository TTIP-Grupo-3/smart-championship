import { lighten, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  backgroundTeamCard: {
    borderRadius: 10,
    backgroundColor: lighten('#282c34', 0.09),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[8],
    flexWrap: 'nowrap',
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

  result: {
    color: 'white',
    fontSize: '40px',
    fontFamily: 'sans-serif',
    fontWeight: 600,
    lineWeight: '24px',
    letterSpacing: '0.24px',
  },
  resultGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  cardsGrid: {
    display: 'flex',
    flexDirection: 'row',
  },
}));
