import { CircularProgress, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const Loader: FC<any> = ({ text, ...loaderProps }) => {
  const { classes } = useStyles();
  return (
    <Grid container className={classes.gridLoading}>
      <CircularProgress {...loaderProps} />
      <Typography variant="body2" color="white" padding={2}>
        {text}
      </Typography>
    </Grid>
  );
};
