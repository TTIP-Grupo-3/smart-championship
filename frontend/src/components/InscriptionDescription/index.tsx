import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const InscriptionDescription: FC<any> = ({ name, price }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.grid}>
      <Typography variant="subtitle1" className={classes.title}>
        {name}
      </Typography>
      <Typography variant="body2">Precio: {price}</Typography>
    </Grid>
  );
};
