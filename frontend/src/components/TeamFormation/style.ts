import { makeStyles } from 'tss-react/mui';
import { Theme, alpha } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  list: {
    width: '94%',
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
    margin: 15,
    borderRadius: '4px',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 0,
    margin: 0,
    alignItems: 'center',
  },
  gridTeam: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  checkbox: {
    paddingLeft: '20px',
    color: theme.palette.blue[200],
  },
}));
