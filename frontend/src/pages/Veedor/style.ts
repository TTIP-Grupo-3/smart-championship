import { grey } from '@mui/material/colors';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    width: 'auto',
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    borderRadius: '4px',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: grey[800],
    [theme.breakpoints.down(370)]: {
      marginRight: 0,
      marginLeft: 0,
    },
  },
  containerResult: {
    margin: 27,
    display: 'flex',
    width: '100%',
  },
}));
