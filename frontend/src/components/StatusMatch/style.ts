import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  statusMatch: {
    color: theme.palette.common.white,
    fontSize: 13,
    fontWeight: 700,
    borderRadius: 6,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
  },
}));
