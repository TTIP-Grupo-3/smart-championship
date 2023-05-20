import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  list: {
    width: '88%',
  },
  listItem: {
    backgroundColor: theme.palette.common.black,
    display: 'flex',
    width: '100%',
    borderRadius: 4,
    marginTop: '2%',
    '&:hover': {
      backgroundColor: 'rgb(191, 54, 12)',
      color: theme.palette.common.white,
    },
  },
  titleText: {
    marginTop: '2%',
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  listItemButton: {
    marginTop: '1.3%',
    marginBottom: '1.3%',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
