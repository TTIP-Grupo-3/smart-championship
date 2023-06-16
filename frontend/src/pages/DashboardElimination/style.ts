import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  gridContainer: {
    width: 'auto',
    display: 'flex',
    paddingTop: '1%',
    flexWrap: 'nowrap',
  },
  tournamentTitle: {
    color: theme.palette.common.white,
    fontSize: 20,
    fontWeight: 600,
    paddingTop: '2%',
    textAlign: 'center',
  },
}));
