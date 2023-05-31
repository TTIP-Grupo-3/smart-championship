import { Button, Grid } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './style';
import { InscriptionDescription } from '../InscriptionDescription';

export const AdminInscriptionCard: FC<any> = ({ id, createdAt, ...props }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Grid className={classes.card}>
      <Grid className={classes.startGrid}>
        <InscriptionDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        <Grid className={classes.rightSpacer} />
        <Grid className={classes.rightButtons}>
          <Button onClick={(): void => navigate(`/`)} className={classes.button}>
            Comprobante
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
