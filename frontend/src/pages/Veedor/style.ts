import { grey } from '@mui/material/colors';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    width: 'auto',
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(13),
    marginLeft: theme.spacing(13),
    paddingBottom: theme.spacing(5),
    borderRadius: '4px',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: grey[800],
    [theme.breakpoints.down(700)]: {
      marginRight: 0,
      marginLeft: 0,
    },
  },
  containerResult: {
    margin: 27,
    display: 'flex',
    width: '100%',
  },
  typographyStatus: {
    paddingTop: 3,
    color: theme.palette.common.white,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'red',
    borderRadius: 6,
  },
  initOrFinishButton: {
    color: 'white',
    backgroundColor: '#bf360c',
    width: '105px',
  },
  initOrFinishTypography: {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
}));
