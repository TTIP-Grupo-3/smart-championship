import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  gridIconTeam: {
    display: 'flex',
    paddingLeft: '4%',
    paddingRight: '4%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '2%',
  },
}));
