import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  paper: {
    width: '100%',
    overflow: 'hidden',
  },
  tableContainer: {
    maxHeight: 380,
  },
  table: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
  },
  columnHead: {
    backgroundColor: '#bf360c',
    minWidth: '30%',
    color: theme.palette.common.white,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    justifyContent: 'center',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: 60,
    marginTop: 10,
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.common.black,
    },
  },
  teamName: {
    justifyContent: 'center',
    minWidth: '30%',
    textAlign: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    width: 160,
    textOverflow: 'ellipsis',
  },
  score: {
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    textAlign: 'center',
    marginTop: 22,
    flexGrow: 1,
  },

  versus: {
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    flexGrow: 2,
  },
  gridMatch: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLogo: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
  },
}));
