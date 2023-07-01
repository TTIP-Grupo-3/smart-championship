import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';
import { EnrollmentDescription } from '../EnrollmentDescription';

const statuses: any = {
  rejected: { color: 'red', text: 'Rechazado' },
  paid: { color: 'green', text: 'Aprobado' },
  to_review: { color: 'lightgreen', text: 'Pendiente' },
  to_pay: { color: '#ED7D31', text: 'No pagado' },
  expired: { color: '#8d6e63', text: 'Expirado' },
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
