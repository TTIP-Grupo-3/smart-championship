import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  gridContainer: {
    display: 'flex',
    height: 110,
    width: '100%',
    padding: 0,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLeft: {
    flexGrow: 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gridTeam: {
    flexDirection: 'column',
    flexGrow: 1,
    border: '2px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerTeam: {
    border: '1px solid black',
    display: 'flex',
    width: '100%',
  },
}));

/*
gridTeam: {
    height: '50px',
    margin: 30,
    border: '2px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  */
