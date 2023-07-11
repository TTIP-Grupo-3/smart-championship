import { Button, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';
import { InscriptionDescription } from '../InscriptionDescription';
import { statuses } from '../TeamEnrollmentCard';

export const AdminEnrollmentCard: FC<any> = ({ id, createdAt, handleOpen, checked, ...props }) => {
  const { classes } = useStyles();
  return (
    <Grid className={classes.card}>
      <Grid className={classes.startGrid}>
        <InscriptionDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        {checked && (
          <Typography
            className={classes.statusEnroll}
            style={{
              backgroundColor: statuses[props?.status]?.color,
            }}
          >
            {statuses[props?.status]?.text}
          </Typography>
        )}
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
