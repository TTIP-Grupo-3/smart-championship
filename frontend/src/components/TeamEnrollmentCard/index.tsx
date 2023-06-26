import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';
import { EnrollmentDescription } from '../EnrollmentDescription';

const statuses: any = {
  rejected: { color: 'red', text: 'Rechazado' },
  approved: { color: 'green', text: 'Aprobado' },
  pending: { color: 'lightgreen', text: 'Pendiente' },
};

export const TeamEnrollmentCard: FC<any> = ({ id, status, ...props }) => {
  const { classes } = useStyles();
  return (
    <Grid className={classes.card}>
      <Grid className={classes.startGrid}>
        <EnrollmentDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        <Grid className={classes.rightSpacer} />
        <Grid className={classes.rightButtons}>
          <Typography className={classes.status} style={{ backgroundColor: statuses[status].color }}>
            {statuses[status].text}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
