import { makeStyles } from 'tss-react/mui';
import { Theme, alpha } from '@mui/material/styles';

export const useStyles = makeStyles()((theme: Theme) => ({
  grid: { color: alpha(theme.palette.common.white, 0.87) },
  title: { fontWeight: 600, textAlign: 'left' },
}));
