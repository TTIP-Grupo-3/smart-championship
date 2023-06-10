import { Button, Grid } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';
import { InscriptionDescription } from '../InscriptionDescription';

export const AdminInscriptionCard: FC<any> = ({ id, createdAt, handleOpen, ...props }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.card}>
      <Grid className={classes.startGrid}>
        <InscriptionDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        <Grid className={classes.rightSpacer} />
        <Grid className={classes.rightButtons}>
          <Button onClick={() => handleOpen(id)} className={classes.button}>
            Comprobante
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
