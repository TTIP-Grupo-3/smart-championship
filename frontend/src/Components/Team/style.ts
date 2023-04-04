import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  backgroundTeamCard: {
    backgroundColor: '#e0cf63',
  },
  containerScore: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
    backgroundColor: 'cyan',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  goalsTypo: {
    paddingRight: '0.6em',
    paddingLeft: '0.6em',
    textAlign: 'center',
  },
  nameTypo: {
    paddingLeft: 5,
    flexGrow: 5,
    color: 'black',
  },
  diVertical: {
    border: '1px solid grey',
  },
}));
