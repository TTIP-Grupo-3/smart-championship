import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  cardsGrid: {
    display: 'flex',
    flexDirection: 'row',
  },
}));
