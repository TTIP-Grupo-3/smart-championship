import { LinearProgress } from '@mui/material';
import { useStyles } from './style';

export const StartedMatchLoader = () => {
  const { classes } = useStyles();
  return <LinearProgress className={classes.loader} />;
};
