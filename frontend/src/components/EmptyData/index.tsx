import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const EmptyData: FC<any> = ({ emptyText }) => {
  const { classes } = useStyles();

  return (
    <Grid container className={classes.gridEmpty}>
      <Typography variant="body2" color="white">
        {emptyText}
      </Typography>
    </Grid>
  );
};
