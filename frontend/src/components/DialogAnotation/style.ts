import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  dialogPaper: {
    height: '70%',
  },
  itemList: {
    height: '45px',
    display: 'flex',
    flexDirection: 'row',
    '&:hover': {
      backgroundColor: '#0059B2',
    },
  },
}));
