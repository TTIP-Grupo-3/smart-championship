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
}));
